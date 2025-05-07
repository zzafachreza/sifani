import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyInput } from '../../components';
import DatePicker from 'react-native-datepicker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function SAddSuami({ navigation, route }) {
  const [foto, setFoto] = useState('https://zavalabs.com/nogambar.jpg');
  const [loading, setLoading] = useState(false);
  const [kirim, setKirim] = useState(route.params || {});

  useEffect(() => {
    if (route.params) {
      setKirim(prev => ({
        ...prev,
        ...route.params,
        fid_user: route.params.fid_user || prev.fid_user || '',
      }));
    }
  }, [route.params]);

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

      if (response?.assets && response.assets.length > 0) {
        const image = response.assets[0];

        if (!image.fileSize || image.fileSize > 2097152) {
          showMessage({ message: 'Ukuran gambar lebih dari 2MB.', type: 'danger' });
          setFoto('https://zavalabs.com/nogambar.jpg');
          setKirim(prev => ({ ...prev, suami_foto: null }));
          return;
        }

        const base64Image = `data:${image.type};base64,${image.base64}`;
        setKirim(prev => ({ ...prev, suami_foto: base64Image }));
        setFoto(image.uri);
      } else {
        showMessage({ message: 'Gambar tidak valid.', type: 'danger' });
        setFoto('https://zavalabs.com/nogambar.jpg');
        setKirim(prev => ({ ...prev, suami_foto: null }));
      }
    });
  };

  const sendServer = () => {
    // log tanpa base64
    const { suami_foto, ...logData } = kirim;
    console.log('✅ Kirim data suami (tanpa base64):', logData);

    if (!kirim.fid_user) {
      showMessage({ message: 'User ID tidak ditemukan. Ulangi proses dari awal.', type: 'danger' });
      return;
    }

    const requiredFields = [
      { key: 'suami_nama', label: 'Nama' },
      { key: 'suami_tempat_lahir', label: 'Tempat lahir' },
      { key: 'suami_tanggal_lahir', label: 'Tanggal lahir' },
      { key: 'suami_pekerjaan', label: 'Pekerjaan' },
      { key: 'suami_telepon', label: 'Telepon' },
      { key: 'suami_alamat', label: 'Alamat' },
      { key: 'suami_orangtua', label: 'Nama orang tua' },
      { key: 'suami_foto', label: 'Foto' },
    ];

    for (let field of requiredFields) {
      if (!kirim[field.key]) {
        showMessage({ message: `${field.label} masih kosong`, type: 'danger' });
        return;
      }
    }

    navigation.navigate('SAddIstri', {
      ...kirim,
      fid_user: kirim.fid_user, // tetap pastikan dibawa
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
      }}>
        Upload pas foto (latar biru) Maksimal 2MB
      </Text>
      <Image
        source={{ uri: foto }}
        style={{
          width: '50%',
          alignSelf: 'center',
          aspectRatio: 2,
          resizeMode: 'contain',
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
        <MyInput label="Nama" value={kirim.suami_nama} onChangeText={x => setKirim(prev => ({ ...prev, suami_nama: x }))} iconname="person" placeholder="Masukkan nama" />
        <MyGap jarak={10} />
        <MyInput label="Tempat Lahir" value={kirim.suami_tempat_lahir} onChangeText={x => setKirim(prev => ({ ...prev, suami_tempat_lahir: x }))} iconname="person" placeholder="Masukkan tempat lahir" />
        <MyGap jarak={10} />
        <DatePicker
          style={{ width: '100%' }}
          date={kirim.suami_tanggal_lahir}
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
          onDateChange={(date) => setKirim(prev => ({ ...prev, suami_tanggal_lahir: date }))}
        />
        <MyGap jarak={10} />
        <MyInput label="Pekerjaan" value={kirim.suami_pekerjaan} onChangeText={x => setKirim(prev => ({ ...prev, suami_pekerjaan: x }))} iconname="clipboard" placeholder="Masukkan pekerjaan" />
        <MyGap jarak={10} />
        <MyInput label="Telepon / Nomor HP" value={kirim.suami_telepon} onChangeText={x => setKirim(prev => ({ ...prev, suami_telepon: x }))} iconname="call" keyboardType="phone-pad" maxLength={15} placeholder="Masukkan telepon" />
        <MyGap jarak={10} />
        <MyInput label="Alamat" value={kirim.suami_alamat} onChangeText={x => setKirim(prev => ({ ...prev, suami_alamat: x }))} iconname="home" placeholder="Masukkan alamat" />
        <MyGap jarak={10} />
        <MyInput label="Nama Orang Tua" value={kirim.suami_orangtua} onChangeText={x => setKirim(prev => ({ ...prev, suami_orangtua: x }))} iconname="people" placeholder="Masukkan nama orang tua" />
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
