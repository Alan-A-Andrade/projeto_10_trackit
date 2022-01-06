
import Header from "../Header"
import Menu from "../Menu";
import Background from "../../GenericComponents/Background";

import InputBox from "../../GenericComponents/Input";
import WeekdayBox from "../../GenericComponents/WeekdayBox";
import SaveButton from "../../GenericComponents/SaveButton";

import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from "axios";

import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function HabitsPage() {

  const [creationMode, setCreationMode] = useState(false)

  const [habitsData, setHabitsData] = useState([]);

  const { token, setToken } = useContext(UserContext);

  const [loading, setLoading] = useState(false)

  const [reload, setReload] = useState([false])

  const [newHabit, setNewHabit] = useState({
    name: "",
    days: []
  })

  useEffect(() => {

    const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });

    request.then(answer => {
      setHabitsData(answer.data)

      console.log(answer.data)
    });

  }, reload);

  function handleHabitsContent() {

    if (habitsData.length === 0) {

      return (
        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
      )
    }

    else {
      return (
        ""
      )
    }

  }

  function addHabit(event) {

    event.preventDefault()

    setLoading(true)

    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", newHabit, {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    })

    request.then(requestSuccess);

    request.catch(requestFail)

  }


  function requestSuccess(answer) {
    setReload([true])
    setCreationMode(false)
    setLoading(false)
    setNewHabit({
      name: "",
      days: []
    })
  }

  function requestFail(answer) {
    console.log(answer.response.status)

    setLoading(false)

  }

  function handleCreationForm() {

    return (
      <NewHabitBox isLoading={loading}>
        <form onSubmit={addHabit}>
          <InputBox
            type="text"
            placeholder="nome do hábito"
            value={newHabit.name}
            onChange={setNewHabit}
            inputState={newHabit}
            stateKey="name"
            isLoading={loading}
          />
          <div className="week-list">
            {Array.from(Array(7).keys()).map((el) => <WeekdayBox key={el} state={newHabit} setState={setNewHabit} createMode={true} weekday={el} />)}
          </div>
          <div className="create-option-wrapper">
            <h1 onClick={() => { setCreationMode(false) }}>cancelar</h1>
            <SaveButton text="Salvar" isLoading={loading} />
          </div>
        </form>
      </NewHabitBox>
    )

  }




  return (
    <HabitsStyled>
      <Header></Header>
      <TitleWrapper>
        <h1>Meus hábitos</h1>
        <AddButton onClick={() => { setCreationMode(true) }}>+</AddButton>
      </TitleWrapper>
      <HabitsList>
        {creationMode === true ? handleCreationForm() : ""}
        {handleHabitsContent()}
      </HabitsList>
      <Menu></Menu>
      <Background></Background>
    </HabitsStyled>
  )


}

const NewHabitBox = styled.section`

width: 340px;
height: 180px;

background: #FFFFFF;
border-radius: 5px;

padding: 18px;

display: flex;
flex-wrap: wrap;
flex-direction: column;

position: relative;

${props => props.isLoading ? "pointer-events: none;" : ""}

.week-list{
  padding-top: 8px;
  display: flex;
  gap: 4px;
}

.create-option-wrapper{
  display: flex;
  position: absolute;
  bottom: 18px;
  right: 18px;
  align-items: center;
  gap: 23px;

  h1{
    font-style: normal;
    font-weight: normal;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    opacity: ${props => props.isLoading ? 0.7 : 1}
  }
}

`

const HabitsStyled = styled.section`

width: 100%;
height: 100%;

padding: 77px 0px;

`

const HabitsList = styled.div`

padding: 0px 18px;

p{
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;

color: #666666;
}

`

const TitleWrapper = styled.div`

width:100%;
height: 75px;

display: flex;
align-items: center;
justify-content: space-between;

padding: 0px 18px;

h1{
  font-style: normal;
font-weight: normal;
font-size: 22.976px;
line-height: 29px;

/* identical to box height */

color: #126BA5;
}

`
const AddButton = styled.div`

width: 40px;
height: 35px;
left: 317px;
top: 92px;

background: #52B6FF;
border-radius: 4.63636px;

padding-bottom: 0.1em;

display: flex;
align-items:center;
justify-content:center;


font-style: normal;
font-weight: normal;
font-size: 26.976px;
line-height: 34px;
text-align: center;

color: #FFFFFF;

`