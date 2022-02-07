import React, { useContext, useEffect, useState } from "react";

import MapView from "react-native-maps";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { CompactRestaurantInfo } from "../../../components/restaurant/compact-restaurant-info.component";
import { Text } from "../../../components/typography/text.component";

const MapCallout = ({ restaurant = {} }) => {
  return (
    <>
      <CompactRestaurantInfo isMap={true} restaurant={restaurant} />
    </>
  );
};

export default MapCallout;
