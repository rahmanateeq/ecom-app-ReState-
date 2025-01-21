import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { Logout } from "@/lib/appwrite";


  interface SettingItemProps {
    title: string;
    icon: ImageSourcePropType;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
  }

  const Settingitem = ({
    title,
    icon,
    onPress,
    textStyle,
    showArrow }: SettingItemProps) => (
                <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
                  <View className="flex flex-row items-center gap-3">
                    <Image source={icon} className="size-6"/>
                    <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
                  </View>
                  {showArrow && (<Image source={icons.rightArrow} className="size-5" />)}
                </TouchableOpacity>
              )

  const Profile = () => {     
    const  { user, loading, refetch } = useGlobalContext()
  const handleLogout = async () => {
    console.log("clicked")
      const result = await Logout()
      if(result){
        Alert.alert("success", "Logout Successfully")
        refetch()
      }else{
        Alert.alert("Error", "Failed to logout")
      }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{uri: user?.avatar}}
              className="size-44 relative rounded-full"
            />

            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold mt-2">
              {user?.name}
            </Text>
          </View>
        </View>
        <View className="flex flex-col mt-5">
          <Settingitem title='My Bookings' icon={icons.calendar} showArrow/>
          <Settingitem title='Payments' icon={icons.wallet} showArrow/>
          
        </View>
        <View className="flex flex-col mt-5 border-t border-gray-200 pt-5">
          {settings.slice(2).map((item, index) => (
            <Settingitem key={index}
              {...item}
              showArrow
            />
          ))}
        </View>
        <View className="flex flex-col mt-5 border-t border-primary-200 pt-2">
         
            <Settingitem icon={icons.logout} title='Logout' onPress={handleLogout} />
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
