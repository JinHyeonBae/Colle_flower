
import ChattingResolver from './ChattingResolver';


const resolver ={
    ...ChattingResolver.Query,

    ...ChattingResolver.Mutation,

    ...ChattingResolver.Subscription

}