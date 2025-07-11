// remember to run `npm install @react-native-picker/picker` if you haven't already
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function DateFactScreen() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [fact, setFact] = useState('');
  // Fetch fact when month or day changes
  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch(`https://numbersapi.p.rapidapi.com/${month}/${day}/date?json=true`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'a83d4abb62msh0eb483b91e1f39dp1bd8f3jsn0c3e244e4f5c',
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com',
          },
        });
        const data = await response.json();
        setFact(data.text);
      } catch {
        setFact('Failed to fetch fact. Please try again.');
      }
    };

    const isValidDate = (month: number, day: number): boolean => {
    const daysInMonth = [31, 29, 31, 30, 31, 30,
                         31, 31, 30, 31, 30, 31]; // Feb allows up to 29

    if (month < 1 || month > 12) return false;
    return day >= 1 && day <= daysInMonth[month - 1];
  };

  const m = Number(month);
  const d = Number(day);

  if (isValidDate(m, d)) {
    fetchFact();
  } else {
    setFact('');
  }
}, [month, day]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fbb1c8', padding: 10, borderRadius: 6 }}>
        <Text style={styles.title}>Fun Fact with Date</Text>
      </View>
      {fact !== '' && (
        <View style={styles.factCard}>
          <Text style={styles.fact}>{fact}</Text>
        </View>
      )}
      <Picker
        selectedValue={month}
        onValueChange={(itemValue) => setMonth(itemValue)}
      >
        <Picker.Item label="Select Month" value="" />
        <Picker.Item label="January" value="1" />
        <Picker.Item label="February" value="2" />
        <Picker.Item label="March" value="3" />
        <Picker.Item label="April" value="4" />
        <Picker.Item label="May" value="5" />
        <Picker.Item label="June" value="6" />
        <Picker.Item label="July" value="7" />
        <Picker.Item label="August" value="8" />
        <Picker.Item label="September" value="9" />
        <Picker.Item label="October" value="10" />
        <Picker.Item label="November" value="11" />
        <Picker.Item label="December" value="12" />
      </Picker>
      {/* <TextInput
        style={styles.input}
        placeholder="Month (1-12)"
        //it's so weird but in the assignment text it shows the default keyboard. if questions asked, change to 'default'
        keyboardType="numeric"
        value={month}
        onChangeText={setMonth}
        maxLength={2}
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Day (1-31)"
        //it's so weird but in the assignment text it shows the default keyboard. if questions asked, change to 'default'
        keyboardType="numeric"
        value={day}
        onChangeText={setDay}
        maxLength={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffe4ec',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    // marginBottom: 15,
    fontWeight: 'bold',
    //backgroundColor: '#lightpink',
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
  fact: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333',
  },
  factCard:{
    backgroundColor:'#fff0f5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    elevation: 2,
  }
});
