import axios from 'axios';
import {useEffect} from 'react';
import {Text} from 'react-native';

export default function () {

  const fetchAllPosts = async ()=>{
    try {
        const response = await axios.get('http://flames.ct.ws/wp-json/api/v1/posts')
        console.log(response.data);
        
    } catch (error) {
        
    }
  }

  useEffect(() => {
    fetchAllPosts()
  }, []);

  return <Text>Posts</Text>;
}
