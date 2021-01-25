
import {GET_CHANNEL_LIST, GET_POST, GET_COMMENT} from './Query.js';

//어케 불러온담? 서버코드는 만들고 나서 생성이 되는데, 불러올 때도 서버코드가 필요하면, 맨처음은..?
//그리고 그걸 어디에 저장해놓지. 껐다 켰을 때 나의 서버코드는?
//채널 테이블..?
// 서버코드를 한 번 불러오면 캐시에 저장이 되어있군!
export const QueryData = ()=>{
    fetch('/graphql', {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query : "{Channel{ Host ChannelTitle ServerCode TeamMember }}",
            variables : {
                "ServerCode" : 0
            }
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