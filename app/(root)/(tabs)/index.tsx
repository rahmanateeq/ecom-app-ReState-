import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import seed from "@/lib/seed";
import { Link } from "expo-router";
import { Text, View, Image, TouchableOpacity, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const loading = false
  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Button  title="seed" onPress={seed}/> */}
      <FlatList
        columnWrapperClassName="flex gap-5 px-5" //gap between item
        numColumns={2} //no of item show in one row
        contentContainerClassName="pb-32"
        data={[]}
        renderItem={({ item }) => <Card />} // data show in list
        keyExtractor={(item) => item}  // set it string(id)
        showsVerticalScrollIndicator={false}
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
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={images.avatar}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik-medium text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-xs font-rubik-medium text-black-300">
                    AtiqurRahman
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-5" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-lg font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}  //hide scroll bar 
                contentContainerClassName="flex gap-4 mt-5"  
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                bounces={false}
              />
            </View>
            
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-lg font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
