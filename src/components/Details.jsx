import { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap";
import TodayWeather from "./TodayWeather";
import Error from "./Error"
import Loading from "./Loading"
import NavBar from "./NavBar";
const Details = (props) => {
    const [isError, setIsError]= useState(false);
    const [isLoading, setIsLoading]= useState(true)
    const [weather, setWeather]= useState({})
    

    useEffect(() => {
        const fetchWeather = async () => {
          try {
            let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=4927c9b7db462d3c970a7f50860e225c`)
            console.log(response)
            if(response.ok) {
              let weather = await response.json();
              setWeather(weather)
              setIsLoading(false)
              setIsError(false)
              console.log(weather)       
            } else {
              setIsError(true)
              setIsLoading(false)
            }
          } catch (err) {
            console.log(err)
            setIsError(true)
            setIsLoading(false)
          }
        }
        if(props.lat && props.lon) {
          fetchWeather()
        }
      },[props])
      
      if(isLoading) {
        return <div>Caricamento</div>
      }
      
    return(
        <Container id="details" className="pt-5">
            {isLoading && <Loading />}
            {isError && <Error />}
            <Row id="today-weather" className="px-3 mx-5 rounded">
                <TodayWeather name={props.name} temp={weather.list[0].main.temp -273.15} date={weather.list[0].dt_txt} weather={weather.list[0].weather[0].description}/>
            </Row>
            <Row>
                <Col>
                    <h5 className="pt-5 text-white ps-5 pb-2">5 Days Forecast</h5>
                </Col>
            </Row>
            <Row id="forecast" className="mx-5 rounded pt-3 pb-2">
              {weather.list.filter((ele) => ele.dt_txt.includes("12:00:00"))
              .map((ele) => {
                return(
                  <Col key={ele.dt_txt} className="col-12 d-flex justify-content-evenly text-white align-items-center">
                    <img src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`} alt="" />
                    <p>{parseInt(ele.main.temp -273.15)} °C</p>
                    <p className="opacity-75">{ele.main.humidity} %</p>
                    <p className="opacity-75">{ele.dt_txt.slice(0,10)}</p>
                  </Col>
                )
              })
              }                
            </Row>
            <NavBar />            
        </Container>
    )
}
export default Details;