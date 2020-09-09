import { useForm } from "react-hook-form";
import React from 'react';
import GoogleApiWrapper from './App';

type PersonScore = {
  name: string;
  email: string;
  score: number;
};

export const PersonScoreForm = () => {
  const { register, handleSubmit } = useForm<PersonScore>();
  const onSubmit = (data: PersonScore) => {
    console.log("data", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={register}
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          ref={register}
        />
      </div>
      <div className="field">
        <label htmlFor="score">Score</label>
        <input
          type="number"
          id="score"
          name="score"
          ref={register}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};