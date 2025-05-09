import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, windowWidth } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyPicker } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import FastImage from 'react-native-fast-image';

export default function SAddTrf({ navigation, route }) {
  const [foto, setFoto] = useState('https://zavalabs.com/nogambar.jpg');
  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState(route.params || {});
  const cancelTokenRef = useRef(null);

  const options = {
    includeBase64: true,
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1080,
  };

  const getGallery = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        showMessage({ message: 'Pengambilan gambar dibatalkan', type: 'danger' });
      } else if (response) {
        const image = response;
        if (image.uri && image.fileSize > 0) {
          const base64Image = `data:${image.type};base64,${image.base64}`;
          setKirim(prev => ({ ...prev, foto_transfer: base64Image }));
          setFoto(image.uri);
        } else {
          showMessage({ message: 'Gambar tidak valid atau file kosong', type: 'danger' });
        }
      } else {
        showMessage({ message: 'Gambar tidak valid atau rusak', type: 'danger' });
      }
    });
  };

  useEffect(() => {
    const param = route.params || {};
    getData('user').then(u => {
      console.log(u)
      setKirim(prev => ({
        ...prev,
        fid_user: u.id, // JAGA-JAGA
        suami_foto: param.suami_foto || prev.suami_foto,
        istri_foto: param.istri_foto || prev.istri_foto,
        pembayaran: 'TRANSFER',
        biaya: '700000',
        ...param, // disimpan paling akhir, biar gak overwrite yang penting
      }));
    })
  }, []);

  const sendServer = () => {
    setLoading(true);

    setTimeout(() => {

      axios.post(`${apiURL}1add_nikah.php`, kirim).then(res => {
        console.log(res.data);
        if (res.data.status == "success") {
          showMessage({
            type: 'success',
            message: res.data.message
          })
          navigation.replace('Home')

          setLoading(false);

        }
      })



    }, 1000)

  };

  const UploadFoto = () => (
    <View
      style={{
        padding: 10,
        backgroundColor: colors.white,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        elevation: 2,
      }}>
      <Text style={{ fontFamily: fonts.secondary[600], color: colors.black }}>
        Upload Bukti Transfer (maksimal 2MB)
      </Text>
      <FastImage
        source={{ uri: foto }}
        style={{
          marginVertical: 10,
          width: 155,
          height: 230,
          alignSelf: 'center',
          // aspectRatio: 2,
          // resizeMode: 'contain',
        }}
      />
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1, paddingLeft: 5 }}>
          <MyButton
            onPress={getGallery}
            title="GALLERY"
            colorText={colors.primary}
            warna={colors.secondary}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, padding: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: fonts.secondary[600], fontSize: windowWidth / 30 }}>
          Total Pembayaran
        </Text>
        <Text style={{ fontFamily: fonts.secondary[400], fontSize: windowWidth / 25 }}>
          Rp. 700.000
        </Text>
        <MyGap jarak={10} />
        <MyPicker
          iconname="options"
          label="Pembayaran"
          value={kirim.pembayaran}
          onValueChange={(x) => setKirim(prev => ({ ...prev, pembayaran: x }))}
          data={[{ value: 'TRANSFER', label: 'TRANSFER' }]}
        />
        {kirim.pembayaran === 'TRANSFER' && (
          <>
            <Text
              style={{
                marginTop: 10,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 30,
              }}>
              Silahkan melakukan transfer ke:
            </Text>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text
                style={{
                  flex: 0.4,
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 25,
                }}>
                Bank
              </Text>
              <Text style={{ flex: 0.1 }}>:</Text>
              <Text style={{ flex: 1 }}>Bank Syariah Indonesia</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 0.4 }}>Rekening</Text>
              <Text style={{ flex: 0.1 }}>:</Text>
              <Text style={{ flex: 1 }}>7199478049</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 0.4 }}>Atas Nama</Text>
              <Text style={{ flex: 0.1 }}>:</Text>
              <Text style={{ flex: 1 }}>UPTD Masjid Agung Baitul Makmur</Text>
            </View>
            <MyGap jarak={20} />
            <UploadFoto />
          </>
        )}
        <MyGap jarak={20} />
        {loading && <ActivityIndicator size="large" color={colors.primary} />}
        {!loading && <MyButton onPress={sendServer} title="Simpan" warna={colors.primary} Icons="person-add" />}


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
