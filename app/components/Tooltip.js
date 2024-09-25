import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useTheme } from '../lib/utils/SetTheme';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { SafeAreaView } from 'react-native-safe-area-context';

const options =[
  {title:'Add', onPress:()=>{console.log('added')}},
  {title:'Delete', onPress:()=>{console.log('deleted')}},
  {title:'Share', onPress:()=>{console.log('share')}},
  {title:'Details', onPress:()=>{console.log('details')}}
]

export const ToolTip = ({isOpen = false, onClose, children}) => {
    const { currentTheme } = useTheme();
    const [isTooltipVisible, setIsTooltipVisible] = useState(isOpen);
    const [scaleAnim] = useState(new Animated.Value(0));


    const OpenTooltip = () => {
      setIsTooltipVisible(true);
  
      scaleAnim.setValue(0);
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const CloseTooltip = () => {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsTooltipVisible(false));
    };

    useEffect(() => {
        setIsTooltipVisible(isOpen)
    }, [isOpen])
    
  
    return (
      
      <SafeAreaView style={styles.toolTipContainer}>
        <Tooltip
          popover={
              (true && 
              <Animated.View
                style={[
                  styles.tooltipContent,
                  {
                    //transform: [{ scale: scaleAnim }],
                    backgroundColor: "red"
                  },
                ]} >
                  {options.map((option, index)=>(
                    <Pressable key={index} onPress={option.onPress} style={styles.option}>
                      <Text style={styles.optionText}>{option.title}</Text>
                    </Pressable>
                  ))}
                              
              </Animated.View>)
          }
          backgroundColor="transparent"
          height={150}
          width={300}
          withPointer={false}
          placement="auto"
          onOpen={()=>{OpenTooltip}}
          onClose={()=>{CloseTooltip}}
          containerStyle={{ position: 'absolute'}}
          overlayColor='transparent'
                    
        >
          {children}
        </Tooltip>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  toolTipContainer: {
    backgroundColor:'green',
    flex:1,
    position:'relative'
  },
  tooltipContent: {
    borderRadius: 20,
    paddingVertical:25,
    paddingLeft:15,
    paddingRight:25,
    gap:15,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
})