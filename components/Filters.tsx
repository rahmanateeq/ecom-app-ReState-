import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>();
    const [ selectCategory, setSelectCategory ] = useState(params.filter || 'All');

    const handleCategory = (text: string) => {
        if(text === selectCategory) {
            setSelectCategory('All')
            router.setParams({filter: 'All'})
            return;
        }
        setSelectCategory(text)
        router.setParams({filter: text})
    }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}  className='mt-3 mb-2'>
       {categories.map((item, index) => (
           <TouchableOpacity key={index} onPress={() => handleCategory(item.category)}
           className={`flex flex-row items-start gap-2 px-4 mr-4 py-2 rounded-full
            ${selectCategory === item.category ? 'bg-primary-300' : 'border bg-primary-100 border-primary-200'}`}    
           >
            <Text className={`text-sm ${selectCategory === item.category ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'} `}>{item.title}</Text>
           </TouchableOpacity>
       ))

       }
    </ScrollView >
  )
}

export default Filters