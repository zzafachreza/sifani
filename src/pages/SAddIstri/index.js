import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyInput } from '../../components';
import DatePicker from 'react-native-datepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function SAddIstri({ navigation, route }) {
    const [foto, setfoto] = useState('https://zavalabs.com/nogambar.jpg');
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState(route.params);

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
            } else if (response?.assets && response.assets.length > 0) {
                const image = response.assets[0];
                if (image.uri && image.fileSize > 0) {
                    const base64Image = `data:${image.type};base64,${image.base64}`;
                    setKirim({ ...kirim, istri_foto: base64Image });
                    setfoto(image.uri);
                } else {
                    showMessage({ message: 'Gambar tidak valid atau file kosong', type: 'danger' });
                }
            } else {
                showMessage({ message: 'Gambar tidak valid atau rusak', type: 'danger' });
            }
        });
    };

    const sendServer = () => {
        if (!kirim.istri_nama) {
            showMessage({ message: 'Nama masih kosong', type: 'danger' });
        } else if (!kirim.istri_tempat_lahir) {
            showMessage({ message: 'Tempat lahir masih kosong', type: 'danger' });
        } else if (!kirim.istri_tanggal_lahir) {
            showMessage({ message: 'Tanggal lahir masih kosong', type: 'danger' });
        } else if (!kirim.istri_pekerjaan) {
            showMessage({ message: 'Pekerjaan masih kosong', type: 'danger' });
        } else if (!kirim.istri_telepon) {
            showMessage({ message: 'Telepon masih kosong', type: 'danger' });
        } else if (!kirim.istri_alamat) {
            showMessage({ message: 'Alamat masih kosong', type: 'danger' });
        } else if (!kirim.istri_foto) {
            showMessage({ message: 'Foto masih kosong', type: 'danger' });
        } else {
            setLoading(true);
            axios.post('https://your-api-url.com/upload', kirim)
                .then((res) => {
                    setLoading(false);
                    navigation.navigate('SAddTrf', kirim);
                })
                .catch((err) => {
                    setLoading(false);
                    showMessage({ message: 'Gagal mengirim data ke server', type: 'danger' });
                });
        }
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
            <Text
                style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                }}>
                Upload pas foto (maksimal 2MB)
            </Text>
            <Image
                source={{
                    uri: foto || 'https://zavalabs.com/nogambar.jpg',
                }}
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
                <MyInput
                    value={kirim.istri_nama}
                    label="Nama"
                    onChangeText={(x) => setKirim({ ...kirim, istri_nama: x })}
                    iconname="person"
                    placeholder="Masukkan nama"
                />
                <MyGap jarak={10} />
                <MyInput
                    value={kirim.istri_tempat_lahir}
                    label="Tempat Lahir"
                    onChangeText={(x) => setKirim({ ...kirim, istri_tempat_lahir: x })}
                    iconname="person"
                    placeholder="Masukkan tempat lahir"
                />
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
                    onDateChange={(date) => setKirim({ ...kirim, istri_tanggal_lahir: date })}
                />
                <MyGap jarak={10} />
                <MyInput
                    value={kirim.istri_pekerjaan}
                    label="Pekerjaan"
                    onChangeText={(x) => setKirim({ ...kirim, istri_pekerjaan: x })}
                    iconname="clipboard"
                    placeholder="Masukkan pekerjaan"
                />
                <MyGap jarak={10} />
                <MyInput
                    keyboardType="number-pad"
                    maxLength={15}
                    value={kirim.istri_telepon}
                    label="Telepon / Nomor HP"
                    onChangeText={(x) => setKirim({ ...kirim, istri_telepon: x })}
                    iconname="call"
                    placeholder="Masukkan telepon"
                />
                <MyGap jarak={10} />
                <MyInput
                    value={kirim.istri_alamat}
                    label="Alamat"
                    onChangeText={(x) => setKirim({ ...kirim, istri_alamat: x })}
                    iconname="home"
                    placeholder="Masukkan alamat"
                />
                <MyGap jarak={20} />
                <UploadFoto />
                <MyGap jarak={20} />
                {!loading ? (
                    <MyButton onPress={sendServer} title="Selanjutnya" warna={colors.primary} Icons="person-add" />
                ) : (
                    <ActivityIndicator size="large" color={colors.primary} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
