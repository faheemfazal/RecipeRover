
import { ScrollView, TouchableOpacity, View,StatusBar,Text } from "react-native";
import { CachedImage } from "../helpers/image";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "react-native-axios";
import Loading from "../component/Loading";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import YoutubeIframe from "react-native-youtube-iframe";


export default function RecipeDetailsScreen(props){
    const [isFavourite,setIsFavourite] = useState(false)
    const [meal,setMeal] =useState(null)
    const [loading,setLoading] = useState(true)
    const navigation = useNavigation()
    console.log(props.route.params,'pppp');
    let item = props.route.params
    
    useEffect(()=>{
       getMealDetails(item.idMeal)
    },[])


    const getMealDetails = async (id) =>{
        try{
           const res = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
           console.log(res.data,'ooo,,,,,,,,,');
           if(res && res.data){
               setMeal(res.data.meals[0])
               setLoading(false)
           }

        }catch(err){
            console.log(err,'o');

        }
    }

    const ingredientsIndexes = (meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        console.log(indexes);

        return indexes;
    }

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }


    console.log(meal,'oooooooooo');

    return (
        <ScrollView className="bg-white flex-1"
        // style={{paddingTop:StatusBar.currentHeight}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:30}} >
            <StatusBar barStyle="light-content" />

            <View className="flex-row justify-center">
                <CachedImage 
                  uri={item.strMealThumb}
                  sharedTransitionTag={item.strMeal}
                  style={{width:wp(98),height:hp(50), borderRadius:32,borderBottomRightRadius:48,marginTop:4}} />

            </View>

            <Animated.View  entering={FadeIn.delay(200).duration(1000)}  className='w-full absolute flex-row items-center justify-between pt-8'>
                <TouchableOpacity onPress={()=>navigation.goBack()} className='p-2 rounded-full ml-5 bg-white'>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
                </TouchableOpacity>
                <TouchableOpacity className='p-2 rounded-full mr-5 bg-white' onPress={()=>setIsFavourite(!isFavourite)}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? 'red': 'gray' }/>
                </TouchableOpacity>

            </Animated.View>

            {
                loading ? (
                    <Loading size='large' className="mt-16 "/>
                ) : (
                    <View className="flex px-4 justi space-y-4 pt-8">
                        <Animated.View  entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">

                        <Text style={{fontSize:hp(3)}} className="font-bold flex-1 text-neutral-700">
                            {meal?.strMeal}
                        </Text>
                        <Text style={{fontSize:hp(2)}} className="font-medium flex-1 text-neutral-500">
                            {meal?.strArea}
                        </Text>
                        </Animated.View>

                        <Animated.View  entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{height:hp(6.5), width:hp(6.5)}}
                                className='bg-white rounded-full flex justify-center items-center'>
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{fontSize:hp(2) }} className="font-bold text-neutral-700">35</Text>
                                </View>
                                <View className="items-center pb-5 space-y">
                                    <Text style={{fontSize:hp(1.3) }} className="font-bold text-neutral-700">Mins</Text>
                                </View>


                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{height:hp(6.5), width:hp(6.5)}}
                                className='bg-white rounded-full flex justify-center items-center'>
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{fontSize:hp(2) }} className="font-bold text-neutral-700">03</Text>
                                </View>
                                <View className="items-center pb-5 space-y">
                                    <Text style={{fontSize:hp(1.3) }} className="font-bold text-neutral-700">Servings</Text>
                                </View>


                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{height:hp(6.5), width:hp(6.5)}}
                                className='bg-white rounded-full flex justify-center items-center'>
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{fontSize:hp(2) }} className="font-bold text-neutral-700">103</Text>
                                </View>
                                <View className="items-center pb-5 space-y">
                                    <Text style={{fontSize:hp(1.3) }} className="font-bold text-neutral-700">cal</Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{height:hp(6.5), width:hp(6.5)}}
                                className='bg-white rounded-full flex justify-center items-center'>
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='#525252' />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{fontSize:hp(2) }} className="font-bold text-neutral-700"></Text>
                                </View>
                                <View className="items-center pb-5 space-y">
                                    <Text style={{fontSize:hp(1.3) }} className="font-bold text-neutral-700">Easy</Text>
                                </View>


                            </View>

                        </Animated.View>

                        <Animated.View  entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
                            <Text className='font-bold flex-1 text-neutral-700' style={{fontSize:hp(2.5)}}>
                                Incredients
                            </Text>
                            <View className="space-y-2 ml-3">
                            {
                                ingredientsIndexes(meal).map(i=>{
                                    return (
                                        <View key={i} className="flex-row space-x-4">
                                            <View style={{height: hp(1.5), width: hp(1.5)}}
                                                className="bg-amber-300 rounded-full" />
                                            <View className="flex-row space-x-2">
                                                    <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                                                    <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                            </View>

                        </Animated.View>

                        <Animated.View  entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                            <Text className='font-bold flex-1 text-neutral-700' style={{fontSize:hp(2.5)}}>
                                Instructions
                            </Text>
                          

                        </Animated.View>
                        <Text style={{fontSize:hp(1.6)}} className="text-neutral-600">
                            {meal?.strInstructions}
                        </Text>

                        {
                            meal.strYoutube && (
                                <Animated.View  entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="space-y-4">
                                    <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                        Recipe Video
                                    </Text>
                                    <View>
                                        <YoutubeIframe videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)} />
                                    </View>
                                </Animated.View>
                            )
                        }

                        
                    </View>
                )
            }

        </ScrollView>
    )
}