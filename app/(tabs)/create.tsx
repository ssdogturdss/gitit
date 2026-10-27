import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
export default function Create() {
  const [image, setImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('streetwear')
  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'images' })
    if (!res.canceled) setImage(res.assets[0].uri)
  }
  const createDrop = async () => {
    if (!image) return
    const { data: { user } } = await supabase.auth.getUser()
    const fileName = `${Date.now()}.jpg`
    const { data } = await supabase.storage.from('products').upload(fileName, { uri: image, type: 'image/jpeg' } as any)
    const url = supabase.storage.from('products').getPublicUrl(fileName).data.publicUrl
    await supabase.from('products').insert({ user_id: user?.id, image_url: url, caption, price: parseInt(price), category, status: 'draft' })
    alert('Draft saved')
  }
  return (
    <View className="flex-1 bg-black p-4">
      <TouchableOpacity onPress={pick} className="bg-zinc-900 h-64 items-center justify-center mb-4"><Text className="text-white">Pick Image</Text></TouchableOpacity>
      <TextInput placeholder="Caption" placeholderTextColor="#666" className="bg-zinc-900 text-white p-4 mb-2" value={caption} onChangeText={setCaption} />
      <TextInput placeholder="Price" placeholderTextColor="#666" className="bg-zinc-900 text-white p-4 mb-2" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TouchableOpacity onPress={createDrop} className="bg-white py-4 mt-auto"><Text className="text-black text-center font-bold">CREATE DROP</Text></TouchableOpacity>
    </View>
  )
}