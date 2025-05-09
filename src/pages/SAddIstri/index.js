import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyInput } from '../../components';
import DatePicker from 'react-native-datepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
export default function SAddIstri({ navigation, route }) {
  const [foto, setFoto] = useState('https://zavalabs.com/nogambar.jpg');
  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState({
    ...route.params,
    fid_user: route.params?.fid_user || '',
  });

  useEffect(() => {
    console.log('📥 DATA MASUK DARI SUAMI:', JSON.stringify(route.params, null, 2));
  }, []);

  const getGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
      selectionLimit: 1,
    }, (response) => {
      if (response.didCancel) {
        showMessage({ message: 'Pengambilan gambar dibatalkan', type: 'danger' });
        return;
      }

      const image = response;


      if (!image.fileSize || image.fileSize > 2097152) {
        showMessage({ message: 'Ukuran gambar lebih dari 2MB.', type: 'danger' });
        setFoto('https://zavalabs.com/nogambar.jpg');
        setKirim(prev => ({ ...prev, istri_foto: null }));
        return;
      }

      const base64Image = `data:${image.type};base64,${image.base64}`;
      setKirim(prev => ({ ...prev, istri_foto: base64Image }));
      setFoto(image.uri);



    });
  };

  const sendServer = () => {
    const { suami_foto, istri_foto, ...logData } = kirim;
    console.log('📦 DATA FINAL ISTRI (tanpa base64):', logData);

    if (!kirim.fid_user || kirim.fid_user === '') {
      showMessage({ message: 'User ID tidak ditemukan. Silakan ulangi proses.', type: 'danger' });
      return;
    }

    const required = [
      { key: 'istri_nama', label: 'Nama' },
      { key: 'istri_tempat_lahir', label: 'Tempat lahir' },
      { key: 'istri_tanggal_lahir', label: 'Tanggal lahir' },
      { key: 'istri_pekerjaan', label: 'Pekerjaan' },
      { key: 'istri_telepon', label: 'Telepon' },
      { key: 'istri_alamat', label: 'Alamat' },
      { key: 'istri_orangtua', label: 'Orang tua' },
      { key: 'istri_foto', label: 'Foto' },
    ];

    for (let i of required) {
      if (!kirim[i.key] || kirim[i.key] === '') {
        showMessage({ message: `${i.label} masih kosong`, type: 'danger' });
        return;
      }
    }

    navigation.navigate('SAddTrf', {
      ...kirim,
      fid_user: kirim.fid_user,
    });
  };


  const UploadFoto = () => (
    <View style={{
      padding: 10,
      backgroundColor: colors.white,
      marginVertical: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.border,
      elevation: 2,
    }}>
      <Text style={{
        fontFamily: fonts.secondary[600],
        color: colors.black,
      }}>Upload pas foto (latar biru) Maksimal 2MB</Text>
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
        <MyInput value={kirim.istri_nama} label="Nama" onChangeText={x => setKirim(prev => ({ ...prev, istri_nama: x }))} iconname="person" placeholder="Masukkan nama" />
        <MyGap jarak={10} />
        <MyInput value={kirim.istri_tempat_lahir} label="Tempat Lahir" onChangeText={x => setKirim(prev => ({ ...prev, istri_tempat_lahir: x }))} iconname="person" placeholder="Masukkan tempat lahir" />
        <MyGap jarak={10} />
        <DatePicker
          style={{ width: '100%' }}
          date={kirim.istri_tanggal_lahir}
          mode="date"
          placeholder="Pilih tanggal lahir"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 },
            dateInput: {
              backgroundColor: colors.zavalabs,
              borderColor: colors.zavalabs,
              borderRadius: 10,
              paddingLeft: 10,
              color: colors.black,
              fontSize: 12,
              fontFamily: fonts.primary[400],
            },
          }}
          onDateChange={(date) => setKirim(prev => ({ ...prev, istri_tanggal_lahir: date }))}
        />
        <MyGap jarak={10} />
        <MyInput value={kirim.istri_pekerjaan} label="Pekerjaan" onChangeText={x => setKirim(prev => ({ ...prev, istri_pekerjaan: x }))} iconname="clipboard" placeholder="Masukkan pekerjaan" />
        <MyGap jarak={10} />
        <MyInput keyboardType="number-pad" maxLength={15} value={kirim.istri_telepon} label="Telepon / Nomor HP" onChangeText={x => setKirim(prev => ({ ...prev, istri_telepon: x }))} iconname="call" placeholder="Masukkan telepon" />
        <MyGap jarak={10} />
        <MyInput value={kirim.istri_alamat} label="Alamat" onChangeText={x => setKirim(prev => ({ ...prev, istri_alamat: x }))} iconname="home" placeholder="Masukkan alamat" />
        <MyGap jarak={10} />
        <MyInput value={kirim.istri_orangtua} label="Nama Orang Tua" onChangeText={x => setKirim(prev => ({ ...prev, istri_orangtua: x }))} iconname="people" placeholder="Masukkan nama orang tua" />
        <MyGap jarak={20} />
        <UploadFoto />
        <MyGap jarak={20} />
        {!loading
          ? <MyButton onPress={sendServer} title="Selanjutnya" warna={colors.primary} Icons="person-add" />
          : <ActivityIndicator size="large" color={colors.primary} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
