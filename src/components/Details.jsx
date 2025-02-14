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
                <Col className="col-12 d-flex justify-content-evenly text-white align-items-center">
                    <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" />
                    <p>{parseInt(weather.list[7].main.temp -273.15)} °C</p>
                    <p className="opacity-75">{weather.list[7].dt_txt.slice(0,10)}</p>
                    <p className="opacity-75">Saturday</p>
                </Col>
                <Col className="col-12 d-flex justify-content-evenly text-white align-items-center">
                    <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" />
                    <p>{parseInt(weather.list[15].main.temp -273.15)} °C</p>
                    <p className="opacity-75">{weather.list[15].dt_txt.slice(0,10)}</p>
                    <p className="opacity-75">Sunday</p>
                </Col>
                <Col className="col-12 d-flex justify-content-evenly text-white align-items-center">
                    <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" />
                    <p>{parseInt(weather.list[23].main.temp -273.15)} °C</p>
                    <p className="opacity-75"> {weather.list[23].dt_txt.slice(0,10)}</p>
                    <p className="opacity-75">Monday</p>
                </Col>
                <Col className="col-12 d-flex justify-content-evenly text-white align-items-center">
                    <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="" />
                    <p>{parseInt(weather.list[31].main.temp -273.15)} °C</p>
                    <p className="opacity-75">{weather.list[31].dt_txt.slice(0,10)}</p>
                    <p className="opacity-75">Tuesday</p>
                </Col>
                <Col className="col-12 d-flex justify-content-evenly text-white align-items-center">
                    <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="" />
                    <p>{parseInt(weather.list[39].main.temp -273.15)} °C</p>
                    <p className="opacity-75">{weather.list[39].dt_txt.slice(0,10)}</p>
                    <p className="opacity-75">Wednesday</p>
                </Col>
            </Row>
            <NavBar />            
        </Container>
    )
}
export default Details;