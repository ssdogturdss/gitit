import { View, Text, Switch } from 'react-native'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
export default function Auto() {
  const [autoDm, setAutoDm] = useState(false)
  const save = async (k: string, v: boolean) => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('automations').upsert({ user_id: user?.id, [k]: v })
  }
  return (
    <View className="flex-1 bg-black p-4">
      <View className="flex-row justify-between py-4 border-b border-zinc-800"><Text className="text-white">Auto DM on sale</Text><Switch value={autoDm} onValueChange={v => { setAutoDm(v); save('auto_dm', v) }} /></View>
    </View>
  )
}