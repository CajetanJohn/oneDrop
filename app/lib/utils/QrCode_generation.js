// QRCodeGenerator.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import Print from 'react-native-print';

const QRCodeGenerator = ({ route, navigation }) => {
  const { data } = route.params; // Extract the data from route parameters

  const handlePrint = async () => {
    await Print.printAsync({
      html: `<html><body><img src="data:image/svg+xml;base64,${QRCode.toDataURL(data)}"/></body></html>`,
    });
  };

  const handleShare = async () => {
    try {
      const svgData = await QRCode.toDataURL(data);
      await Share.open({
        title: 'Share QR Code',
        url: svgData,
        type: 'image/svg+xml',
        message: `Check out this QR code: ${data}`,
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };

  return (
    <View style={styles.container}>
      <QRCode
        value={data}
        size={200}
        backgroundColor='white'
        color='black'
      />
      <Button title="Print QR Code" onPress={handlePrint} />
      <Button title="Share QR Code" onPress={handleShare} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCodeGenerator;
