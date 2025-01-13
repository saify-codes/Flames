import axios from 'axios';
import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import Post from '../components/Post';
import {Post as PostType} from '../types/api/post';
import {useQuery} from '@tanstack/react-query';
import {withLoader} from '../utils';

export default function () {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {isLoading, isError, data, refetch} = useQuery<PostType[], any>({
    queryKey: ['repoData'],
    queryFn: () => axios.get('/posts').then(response => response.data),
  });

  return (
    <View className="p-4">
      {isLoading ? (
        <ActivityIndicator size="small" className="text-primary" />
      ) : isError ? (
        <Text>Error loading data</Text>
      ) : (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <View className="py-1" />}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <Post id={item.id} title={item.title} content={item.content} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => withLoader(setIsRefreshing, refetch())}
            />
          }
        />
      )}
    </View>
  );
}
