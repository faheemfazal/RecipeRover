// import { StatusBar } from "expo-status-bar"
import { Text, TextInput,ScrollView, View ,Image,SafeAreaView,StatusBar } from "react-native"
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import {BellIcon ,MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from "../component/Categories";
import axios from 'react-native-axios';
import { useEffect, useState } from "react";
import Recipes from "../component/Recipes";

export default function HomeScreen(){

    const [activeCategory,setActiveCategory] =  useState('Beef')
    const [categories, setCategories] = useState([])
    const [meals,setMeals] = useState([])


    useEffect(()=>{
         getCategories()
         getRecipes()
    },[])

    const handleChangeCategory = (category) =>{
        getRecipes(category)
        setActiveCategory(category)
        setMeals([])
    }
    
    const getCategories = async () =>{
        try{
           const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        //    console.log(res.data,'ooo');
           if(res && res.data){
               setCategories(res.data.categories)
           }

        }catch(err){
            console.log(err,'o');

        }
    }

    const getRecipes = async (category="Beef") =>{
        try{
           const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        //    console.log(res.data,'ooo..');
           if(res && res.data){
            setMeals(res.data.meals)
           }

        }catch(err){
            console.log(err,'o');

        }
    }

    return (
        <SafeAreaView style={{paddingTop:StatusBar.currentHeight}} className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" />
            <ScrollView 
             showsVerticalScrollIndicator={false}
             contentContainerStyle={{paddingBottom:50}}
             className='space-y-6 pt-15'
            >

                <View className="mx-4 flex-row justify-between items-center">
                    <Image source={require('../assets/image/avatar.png')}  style={{height:hp(5),width:hp(5.5)}} />
                    <BellIcon size={hp(4)}  color="gray" />
                </View>

                <View className='mx-4 space-y-2 mb-2'>
                    <Text style={{fontSize:hp(1.7)}} className="text-neutral-600">hello sefwan </Text>
                        <View>
                            <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">make year</Text>
                        </View>
                        <Text style={{fontSize:hp(3.8)}} className="font-semibold text-neutral-600">stay at <Text className="text-amber-400">Home</Text></Text>

                   

                </View>


                <View className="flex-row mx-4 items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput placeholder="Search any recipe"
                    placeholderTextColor={"gray"}
                    style={{fontSize:hp(1.7)}} 
                    className='flex-1 text-base mb-1 pl-3 tracking-wider'
                    />
                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color='gray'/>

                    </View>
                </View>
                <View>
            { categories.length > 0  &&   <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} handleChangeCategory={handleChangeCategory} />}
                </View>

                <View className="">
                    <Recipes categories={categories} meals={meals} />
                </View>

            </ScrollView>


        </SafeAreaView>
    )
}