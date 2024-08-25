import { useState, useRef } from "react"
import style from "./style.module.css"

export const Main = () => {
  const [countTimer, setCountTimer] = useState(0);
  const [dataTimer, setDataTimer] = useState(0);

  const refStartDate: React.MutableRefObject<Date | null> = useRef(null);
  const refInterval: React.MutableRefObject<ReturnType<typeof setInterval> | null> = useRef(null);
  const refAllSeconds = useRef(0);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const result = +event.target.value;
    if(!Number.isNaN(result) && result < Number.MAX_SAFE_INTEGER) {
      setDataTimer(result)
    }
  }

  const handleclickButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    if(dataTimer) {
      refStartDate.current = new Date();
      refAllSeconds.current = dataTimer;
      refInterval.current = setInterval(() => {
        if(refStartDate.current) {
          const time = refAllSeconds.current - Math.floor((+Date.now() - +refStartDate.current) / 1000);
          if(time <= 0) {
            refStartDate.current = null;
            refAllSeconds.current = 0;
            clearInterval(refInterval.current!)
            setCountTimer(0)
          } else {
            setCountTimer(time)
          }
        }
      }, 1000)
      setCountTimer(dataTimer)
      setDataTimer(0)
    }
  }

  const handleResetButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    refStartDate.current = null;
    refAllSeconds.current = 0;
    clearInterval(refInterval.current!)
    setCountTimer(0)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.box}>
        <div className={style.counter}>{countTimer}</div>
        <input type="text" 
                placeholder="0" 
                value={dataTimer} 
                onChange={handleChangeInput} 
                className={style.area} />
        <div className={style.buttonBox}>
          <button onClick={handleclickButton}>Start</button>
          <button onClick={handleResetButton}>Reset</button>
        </div>
      </div>
    </div>
  )
}