import { Component} from 'react';

export type PlayerData = {
  id: number,
  playerId: number,
  lookingTo: string,
  skillLevel: string,
  maxDistance: number,
  maxDistanceUnit: string,
  latitude: number,
  longitude: number,
  player: {
    name: string,
    profilePhoto: any
  },
  rating:{
    totalVotes: number,
    stars: number
  },
  distanceBetween: number
};