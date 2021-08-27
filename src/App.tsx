import { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import { IProps } from './interfaces/types';
import { shuffleImages } from './utils/utils';

function App() {
  const [images, setImages] = useState<IProps[]>([]);

  const [selectedCard, setSelectedCard] = useState<number[]>([]);

  const [matchedImages, setMatchedImages] = useState<number[]>([]);

  const [score, setScore] = useState(180);

  useEffect(() => {
    fetch('https://tinyfac.es/api/data?limit=8')
      .then((res) => res.json())
      .then((data) => {
        setImages(shuffleImages([...data, ...data]));
      })
      .catch((err) => console.log(err));
  }, []);

  const matchImages = (i: number, j: number) => {
    if (images?.[i]?.url === images?.[j]?.url) {
      setMatchedImages([...matchedImages, i, j]);
      setSelectedCard([]);
      setScore((prev) => prev + 40);
    } else {
      setSelectedCard([...selectedCard, j]);
      if (selectedCard.length === 1) {
        setScore((prev) => prev - 20);
      }
    }
  };

  const whichItem = (index: number) => {
    if (selectedCard.length === 2) {
      setSelectedCard([index]);
    } else {
      matchImages(selectedCard[0], index);
    }
  };

  useEffect(() => {
    if (score <= 0) {
      alert('Game Over');
    }
  }, [score]);

  useEffect(() => {
    if (selectedCard.length === 2) {
      setTimeout(() => {
        setSelectedCard([]);
      }, 3000);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (matchedImages.length === 16) {
      alert('You Win');
    }
  }, [matchedImages]);

  const handleRestart = () => {
    setImages(shuffleImages(images));
    setSelectedCard([]);
    setMatchedImages([]);
    setScore(180);
  };

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center text-white bg-gradient-to-br from-gray-600 via-teal-700 to-gray-800'>
      <header className='w-full flex items-center justify-center flex-col space-y-3 my-5'>
        <h3>Play the Flip card game</h3>
        <div>Select two cards with same content consequtively to make them vanish</div>
        <div>score: {score}</div>
      </header>

      <div className='container w-full h-full flex justify-center my-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 col-span-4 gap-4 h-[500px]'>
          {images.map((item, i) => {
            return (
              <Card
                key={item.id + i}
                item={item}
                index={i}
                whichItem={whichItem}
                visible={selectedCard.includes(i) || matchedImages.includes(i)}
              />
            );
          })}
        </div>
      </div>

      <button onClick={handleRestart} className='mb-5 p-3 bg-blue-400 rounded-full'>
        Restart
      </button>
    </div>
  );
}

export default App;
