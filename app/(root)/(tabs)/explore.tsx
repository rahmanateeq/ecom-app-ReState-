import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '@/components/Cards'
import NoResults from '@/components/NoResults'
import Search from '@/components/Search'
import Filters from '@/components/Filters'
import icons from '@/constants/icons'
import { router } from 'expo-router'

const Explore = () => {

  const loading = false;
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList 
      columnWrapperClassName='felx gap-5 px-5'
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32'
      data={[1,2,3,4]}
      renderItem={(item) => (<Card />)}
      keyExtractor={(item) => item.toString()}
      ListEmptyComponent={
        loading ? (
         <View className="flex-1 justify-center items-center mt-20">  
           <ActivityIndicator size="large" color="#00ff00"/>
         </View>
       ) : (
         <NoResults />
       )
       }
      ListHeaderComponent={
       
        <View className='px-5'>
           <View className=' felx flex-row items-center justify-between mt-5'>
                <TouchableOpacity onPress={() => router.back()} className='flex flex-row items-center justify-center
                bg-primary-200 rounded-full size-11'>
                <Image source={icons.backArrow} className='size-6'/>
                </TouchableOpacity>
                <Text className='text-base font-rubik-medium'>Search for Your ideal</Text> 
                <Image source={icons.bell} className='size-5'/> 
          </View>
          <Search />
          <View className='mt-5'>
          <Filters />
          </View>
        </View>
      }
      />
    </SafeAreaView>
  )
}

export default Explore