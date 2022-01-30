import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppStateData, fetchStory } from '../redux'
import { StoryInfo, UserInfo } from "../types";


export interface Props {
    story: StoryInfo
    users: any
}

class Feed extends Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    render(): React.ReactNode {
        const story: StoryInfo = this.props.story 
        const user: UserInfo = this.props.users && this.props.users[story?.by]   
        return(

            story ?
            <View style={styles.container}>
                <Text style={styles.title}>{story.title}</Text>

                    <View style={styles.keyValueContainer}>
                        <Text style={styles.key}>URL :</Text> 
                        <Text style={styles.value}>{story.url}</Text>
                    </View>

                    <View style={styles.keyValueContainer}>
                        <Text style={styles.key}>Timestamp :</Text> 
                        <Text style={styles.value}>{ (new Date(story.time * 1000)).toLocaleDateString()} { (new Date(story.time * 1000)).toLocaleTimeString()}</Text>

                    </View>

                    <View style={styles.keyValueContainer}>
                        <Text style={styles.key}>Score :</Text> 
                        <Text style={styles.value}>{story.score}</Text>
                    </View>

                    {user &&
                        <View> 

                            <View style={styles.keyValueContainer}> 
                                <Text style={styles.key}>Author :</Text> 
                                <Text style={styles.value}>{user.id}</Text>
                            </View>

                            <View style={styles.keyValueContainer}> 
                                <Text style={styles.key}>Karma Score :</Text> 
                                <Text style={styles.value}>{user.karma}</Text>
                            </View>
                        </View> 
                    }
            </View>
             : null
        )
    }
}


const mapStateToProps = (state: AppStateData) => ({
    users: state.users
});
  
export default connect(
    mapStateToProps
)(Feed);


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'lightGray',
        padding: 8,
        margin: 4,
        borderRadius: 8
    },
    title: {
        fontWeight: '800',
        fontSize: 16,
    },
    keyValueContainer: {
        flex: 1,
        flexDirection:'row',
    },
    key: {
        fontWeight: 'normal',
        fontSize: 14,
    },
    value: {
        fontWeight: '800',
        fontSize: 14,
        flex: 1
    }
  });
