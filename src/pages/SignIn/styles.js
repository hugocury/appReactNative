import styled from 'styled-components/native';


 export const Background = styled.View`
    flex:1;
    background-color: #131313;
 `;

 export const Container = styled.KeyboardAvoidingView`
    margin-top: 12px;
    flex:1;
    align-items: center;
    justify-content: center;
 `;

 export const Logo = styled.Image`
    margin-bottom: 15px;
 `;

 export const AreaInput = styled.View`
    width: 90%;
    border-radius: 7px;
    flex-direction: row;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    background: rgba(119, 136, 153, 1);
    margin-bottom: 15px;
 `;
 
 export const Input = styled.TextInput.attrs({
     placeholderTextColor: 'rgba(240, 255, 255, 1)'
 })`
    width: 90%;
    background: rgba(119, 136, 153, 1);
    font-size: 17px;
    color: #FFF;
 `;

export const SubmitButtonContainer = styled.KeyboardAvoidingView`
    flex: 0.5;
    align-items: center;
    justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #FF7F50;
    width: 90%;
    height: 45px;
    border-radius: 7px;
    margin-top: 10px;
`;

export const SubmitText = styled.Text`
    align-items: center;
    font-size: 20px;
    color: #131313;
`;

export const Link = styled.TouchableOpacity`
    margin-top: 15px;
`;

export const LinkText = styled.Text`
    font-size: 15px;
    color: #FFF;
`;

export const PasswordTitle = styled.Text`
    font-weight: bold;
    padding-left: 16px;
    font-size: 18px;
    color: #FFF;
    margin-bottom: 5px;
`;

export const PasswordText = styled.Text`
    padding-left: 11px;
    font-size: 15px;
    color: #FFF;
`;

export const View = styled.View`
    padding-left: 16px;
    margin-top: 4px;
    flex-direction: row;
    align-items: center;
`

export const Image = styled.Image`
    width: 10px;
    height: 10px;
`