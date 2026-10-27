import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
export default function Drop() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => { load() }, [])
  const load = async () => {
    const { data } = await supabase.from('products').select('*').eq('status', 'draft')
    setProducts(data || [])
  }
  const dropNow = async (id: string) => {
    await supabase.from('products').update({ status: 'live' }).eq('id', id)
    await supabase.from('drops').insert({ product_id: id })
    load()
  }
  return (
    <View className="flex-1 bg-black p-4">
      <FlatList data={products} renderItem={({ item }) => (
        <View className="bg-zinc-900 p-4 mb-2"><Text className="text-white">{item.caption} • ${item.price}</Text><TouchableOpacity onPress={() => dropNow(item.id)} className="bg-white mt-2 py-2"><Text className="text-black text-center">DROP NOW</Text></TouchableOpacity></View>
      )} keyExtractor={i => i.id} />
    </View>
  )
}