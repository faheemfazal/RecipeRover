import { View ,Text, ScrollView, TouchableOpacity, Image} from "react-native";
import { categoryData } from "../constants";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useState } from "react";


export default function Categories({activeCategory,setActiveCategory} ){
    
   

    return (
        <View  >
            <ScrollView 
             horizontal
             showsVerticalScrollIndicator={false}
             className='space-x-4'
             contentContainerStyle={{paddingHorizontal:15}} >
               {
                categoryData.map((cat,index)=>{
                    let isActive = cat.name == activeCategory
                    let activeButtonClass = isActive ? "bg-amber-500" : "bg-black/10"
                    return (

                        <TouchableOpacity
                          key={index}
                          onPress={()=>setActiveCategory(cat.name)}
                          className="flex items-center space-y-1">
                            <View className={"rounded-full p-[6px] "+activeButtonClass }>
                                <Image source={{uri:cat.image}}
                                style={{width:hp(6) , height:hp(6)}}
                                className="rounded-full" />
    
                            </View>
                            <Text className='text-neutral-600 ' style={{fontSize:hp(1.6)}}>{cat.name}</Text>
                          </TouchableOpacity>
                    )
                })
               }

             </ScrollView>

        </View>
    )
}