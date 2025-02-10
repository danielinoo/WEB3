import React, {useState} from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';


//Utilizziamo JsonPlaceHolder come mock API
const getMockWeatherData = (city) => {
  // Simuliamo dati meteo casuali
  const MockData = {
  temp: Math.floor(Math.random() * (30-10) + 10), //temper tra 10 e 30
  humidity: Math.floor(Math.random() * (100-40) + 40), //umidità tra 40 e 100%
  windspeed: Math.floor(Math.random() * (50-0) + 0), //vento tra 0 e 50
  condictions: ['Soleggiato', 'Piovoso', 'Nuvoloso', 'Nevoso'][Math.floor(Math.random() * 4)]
  };
  
  //Simuliamo una chiamata asincrona
  return new Promise((resolve) =>{
    setTimeout(() => {
      resolve(MockData);
    }, 2000); //Ritardo di 2 secondi per simulare una chiamata al servizio internet
  } );
};

//costante con immagini
const immagini = {
  nuvola: require('./assets/nuvola.png'),
  sole: require('./assets/sole.png'),
  neve: require('./assets/neve.png'),
  pioggia: require('./assets/pioggia.png'),
  vento: require('./assets/vento.png'),
};





export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //recupera dati
  const fetchWeatherData = async () => {
    if(!city.trim()){
      Alert.alert('Errore','Per favore inserisci una città');
      return;
    }

    setLoading(true);
    setError(null);

    try{
      const data = await getMockWeatherData(city);
      setWeatherData(data);
    }catch {
      setError('Errore nel recupero dei dati');
      Alert.alert('Errore', 'Impossibile recuperare i dati meteo');
    }finally {
      setLoading(false);
    }
  };
  const VisualizzaImmagini = ({condizione}) => {
    if (condizione == 'Soleggiato'){
      return(
      <Image source={immagini.sole} style={styles.image} />
      );
    };
    if (condizione == 'Piovoso'){
      return(
      <Image source={immagini.pioggia} style={styles.image} />
      );
    };

    if (condizione == 'Nuvoloso'){
      return(
      <Image source={immagini.nuvola} style={styles.image} />
      );
    };

    if (condizione == 'Nevoso'){
      return(
      <Image source={immagini.neve} style={styles.image} />
      );
    };
  };

  const VisualizzaVento =({vento}) => {

    if(vento > 25 ){
      return(
      <Image source={immagini.vento} style={styles.image} />
      );
    };
  };


  //struttura delle informazioni del meteo
  const WeatherInfo = ({data}) => {
    return(
      <View style={styles.weatherContainer}>
        <Text style = {styles.cityName}>{city}</Text>
        <Text style = {styles.temperature}>{data.temp} °C</Text>
        <Text style = {styles.description}>{data.condictions}</Text>
        <View style={styles.container_img}>
        <VisualizzaImmagini condizione = {data.condictions} />
        </View>
        <View style = {styles.detailsContainer}>
          <Text style = {styles.details}>Umidità: {data.humidity} %</Text>
          <Text style = {styles.details}>Vento: {data.windspeed} km/h <VisualizzaVento vento= {data.windspeed}></VisualizzaVento></Text>
          <View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsione Meteo (DEMO)</Text>

      <View style= {styles.inputContainer}>
        <TextInput style={styles.inputContainer} placeholder = 'Inserisci una città' value={city} onChangeText={setCity}></TextInput>
        
        {/* TouchableOpacity che, quando premuto, avvia la funzione fetchWeatherData per recuperare i dati meteo. */}
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData} disabled={loading}>
          <Text style={styles.buttonText}>CERCA</Text>
        </TouchableOpacity>

      </View>
      {loading && (<ActivityIndicator size="large" color='#0000ff' />)} {/*quello che appare durante il caricamento*/}
      
      {/* se dati sono disponibili */}
      {!loading && weatherData && (<WeatherInfo data={weatherData}/>)} 
  
      {/* se c è un errore */}
      {error && ( 
        <Text style={styles.error}> {error}</Text>
      )}

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 15,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },

  container_img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },

  image_vento: {

    width: 30,
    height: 30,
    margin: 10,

  }
});
