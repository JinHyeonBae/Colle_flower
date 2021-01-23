
import {GET_CHANNEL_LIST, GET_POST, GET_COMMENT} from './Query.js';


export const QueryData = ()=>{

    fetch('/graphql', {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query : "{Channel{ Host ChannelTitle ServerCode TeamMember }}"
        })
    }).then(r => r.json())
      .then(console.log)
}

export const MutationData = (data)=>{
    
    data.TeamMember = data.Host;
    console.log(data);
    console.log(typeof data)

    fetch('/graphql', {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query : `mutation CreateChannel($Host : String!, $ChannelTitle : String, $TeamMember : String){
                CreateChannel(Host: $Host, ChannelTitle:$ChannelTitle , TeamMember: $TeamMember){
                    Host,
                    ChannelTitle,
                    TeamMember
                }      
            }`,
            variables : data
        })
    }).then(r => r.json())
      .then(console.log)

}