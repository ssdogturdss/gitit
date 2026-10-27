import { View, Text, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
export default function Sales() {
  const [orders, setOrders] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  useEffect(() => { load() }, [])
  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data } = await supabase.from('orders').select('*').eq('seller_id', user?.id)
    setOrders(data || [])
    setTotal((data || []).reduce((s, o) => s + o.amount, 0))
  }
  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl mb-4">Revenue: ${total}</Text>
      <FlatList data={orders} renderItem={({ item }) => <View className="bg-zinc-900 p-4 mb-2"><Text className="text-white">${item.amount}</Text></View>} keyExtractor={i => i.id} />
    </View>
  )
}