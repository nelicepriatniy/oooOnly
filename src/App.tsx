import React from 'react';
import './App.css';
import SliderComponent from './components/sliderComponent/slider.tsx';

interface SliderData {
  id: number;
  num: number;
  text: string;
  heading: string;
  isActive: boolean;
}

const dataSlider: SliderData[] = [
  {
    id: 1,
    num: 2015,
    text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    heading: 'nam1',
    isActive: true,
  },
  {
    id: 2,
    num: 2016,
    text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
    heading: 'name2',
    isActive: false,
  },
  {
    id: 3,
    num: 2017,
    text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    heading: 'name3',
    isActive: false,
  },
  {
    id: 4,
    num: 2018,
    text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    heading: 'name4',
    isActive: false,
  },
  {
    id: 5,
    num: 2019,
    text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    heading: 'name5',
    isActive: false,
  },
  {
    id: 6,
    num: 2020,
    text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
    heading: 'name6',
    isActive: false,
  },
];

interface AppProps {}

const App = (props: AppProps) => {
  return(<>
    <SliderComponent data={dataSlider} />
  </>)
}

export default App;
