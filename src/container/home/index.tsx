import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from "react-redux";
import Feed from '../../component';
import { AppStateData, fetchStories } from '../../redux'
import { StoryInfo } from '../../types';

const mapActionToProps = {
    fetchStories
  }
  
interface Props {
    topStories: number[],
    fetchStories: () => void,
    stories: Map<string,StoryInfo> 
}

class Home extends Component<Props> {

    constructor(props: Props) {
        super(props)
        
    }

    componentDidMount() {
        this.props.fetchStories()
    }

    renderSortedStories = () => {
        let storyArray: StoryInfo[] = []
        if(this.props.stories) {
            
            let stories = this.props.stories  as any
            this.props.topStories?.map( (id) => {
                let story = stories[`${id}`] as StoryInfo
                storyArray.push(story)
            } )

        } 

        storyArray = storyArray.sort( (a, b) => {
                return (a.score > b.score ? 1: -1) 
            })
            
        return (
            <ScrollView>
                {
                    storyArray.map( (item) => {
                        return item?.id ? <Feed key={item?.id} story={item}/> : null
                    })
                }
            </ScrollView>
        )
        
    }


    render(): React.ReactNode {
        return(
            <View style={{flex: 1}}>
                <SafeAreaView/>
                        {this.renderSortedStories() }
                            <View style={styles.bottomContainer}>
                                <TouchableOpacity onPress={this.props.fetchStories}>
                                    <View style={styles.buttonContainer}>
                                    <Text style={styles.button}>REFRESH</Text>
  
                                    </View>
                                </TouchableOpacity>
                            </View>
                <SafeAreaView/>
          </View>
        )
    }
}
    
const mapStateToProps = (state: AppStateData) => ({
    topStories: state.topStories,
    stories: state.stories,
});
  
export default connect(
    mapStateToProps,
    mapActionToProps
)(Home);
  

const styles = StyleSheet.create( {
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    },
    buttonContainer: {
        width: 150,
        padding: 8,
        margin: 8,
        backgroundColor: 'green',
        textAlign: 'center',
        borderRadius: 5,
    },
    button: {
        textAlign: 'center',
        color: 'white'
    }

})