// src/app/estatisticas.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import {styles} from "./styles"

export default function Estatisticas() {
  return (
    <View style={styles.container}>
      <Text>Estatísticas Page</Text>
      <Link href="/" style={styles.button}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Link>
    </View>
  );
}


