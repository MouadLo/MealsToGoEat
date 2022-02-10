import React, { useState, useEffect, useRef, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();

      await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
    >
      <TouchableOpacity
        style={{ height: "100%", width: "100%" }}
        onPress={snap}
      ></TouchableOpacity>
    </ProfileCamera>
  );
};

export default CameraScreen;
