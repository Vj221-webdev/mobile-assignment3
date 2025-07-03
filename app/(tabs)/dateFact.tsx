
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

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

    if (
      Number(month) >= 1 &&
      Number(month) <= 12 &&
      Number(day) >= 1 &&
      Number(day) <= 31
    ) {
      fetchFact();
    } else {
      setFact('');
    }
  }, [month, day]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter a Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Month (1-12)"
        keyboardType="numeric"
        value={month}
        onChangeText={setMonth}
        maxLength={2}
      />
      <TextInput
        style={styles.input}
        placeholder="Day (1-31)"
        keyboardType="numeric"
        value={day}
        onChangeText={setDay}
        maxLength={2}
      />
      {fact !== '' && <Text style={styles.fact}>{fact}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
  fact: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333',
  },
});
