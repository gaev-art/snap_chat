import {action, chatReducer, InitialStateType} from './chatReducer';
import {MessageType, UserType} from '../m1-ui/chat/Chat';


test('added new user', () => {


  const startState: InitialStateType = {
    messages: [] as Array<MessageType>,
    typingUsers: [] as Array<UserType>
  }

  const user = {
    id: 'id',
    name: 'new user'
  }

  const endState = chatReducer(startState, action.typingUserAdded(user))

  expect(endState.typingUsers.length).toBe(1);
  expect(endState.typingUsers[0].name).toBe('new user');
  expect(endState.typingUsers[0].id).toBe('id');

});


test('added new message', () => {


  const startState: InitialStateType = {
    messages: [] as Array<MessageType>,
    typingUsers: [] as Array<UserType>
  }

  const message: MessageType = {
      id:1,
      message:'new message',
      addedAt:'string',
      user:{
          id:'id',
          name:'name'
      }
  }

  const endState = chatReducer(startState, action.newMessageReceived(message))

  expect(endState.messages.length).toBe(1);
  expect(endState.messages[0].message).toBe('new message');
  expect(endState.messages[0].user.name).toBe('name');

});