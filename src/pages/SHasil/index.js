import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import Orientation from 'react-native-orientation-locker';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import 'moment/locale/id'

export default function TimSetDetail({ navigation, route }) {
    const i = route.params;
    console.log(i);
    const ref = useRef();

    const isFocused = useIsFocused();
    const [link, setLink] = useState('');

    useEffect(() => {
        ref.current.capture({
            snapshotContentContainer: true,
        }).then(uri => {
            console.log("do something with ", uri);
            setLink(uri);
        });
    }, []);

    const MyList = ({ label, value, }) => {
        return (
            <View style={{

                paddingBottom: 2,
                borderBottomWidth: 1,
                borderBottomColor: '#efefef',
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <Text style={{
                    flex: 0.8,
                    fontFamily: fonts.secondary[600],
                    fontSize: 8,
                    color: colors.black
                }}>{label}</Text>
                <Text style={{ flex: 0.1, fontFamily: fonts.secondary[600], fontSize: 8 }}>:</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: 8,
                    color: colors.black
                }}>{value}</Text>
            </View>
        )
    }


    const MyList2 = ({ label, value, }) => {
        return (
            <View style={{

                paddingBottom: 2,
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <Text style={{
                    flex: 0.03,
                    fontFamily: fonts.secondary[600],
                    fontSize: 8,
                    color: colors.black
                }}>{label}</Text>

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: 8,
                    color: colors.black
                }}>{value}</Text>
            </View>
        )
    }



    return (
        <>
            <ViewShot style={{
                flex: 1,
                paddingHorizontal: 5,
                backgroundColor: colors.white,
            }} ref={ref} options={{ fileName: i.kode, format: "png", quality: 1 }}>
                <ScrollView style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}>
                    <View collapsable={false}>
                        <View>
                            <Image source={require('../../assets/header.png')} style={{
                                width: '100%',
                                height: 50,
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Image source={require('../../assets/logoarab.png')} style={{
                                    width: '100%',
                                    height: 40,
                                    resizeMode: 'contain',
                                    alignSelfL: 'center'
                                }} />

                            </View>
                            <View style={{
                                flex: 3,
                            }}>
                                <Image source={require('../../assets/logotulisan.png')} style={{
                                    width: '100%',
                                    height: 40,
                                    resizeMode: 'contain',
                                    alignSelfL: 'center'
                                }} />

                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <Image source={require('../../assets/logo.png')} style={{
                                    width: '100%',
                                    height: 40,
                                    resizeMode: 'contain',
                                    alignSelfL: 'center'
                                }} />
                            </View>
                        </View>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: 10,
                            color: colors.blue
                        }}>{i.suami_nama}
                            <Text style={{
                                flex: 0.2,

                                fontFamily: fonts.secondary[600],
                                fontSize: 14,
                                color: colors.danger
                            }}> «» </Text>{i.istri_nama}</Text>
                        <Text style={{

                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: 10,
                            color: colors.black
                        }}>{moment(i.tanggal).format('dddd, DD MMMM YYYY').toString().toLocaleUpperCase()} PUKUL {i.waktu}</Text>

                        <View style={{
                            marginTop: 2,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                padding: 2,
                            }}>
                                {/* suami */}
                                <Text style={{
                                    backgroundColor: colors.primary,
                                    padding: 2,
                                    textAlign: 'center',
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 11,
                                    color: colors.white
                                }}>Calon Suami</Text>
                                <View style={{
                                    marginTop: 2,
                                    flexDirection: 'row',
                                    alignItems: 'flex-start'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 10,
                                        color: colors.black
                                    }}>Foto Latar Biru</Text>
                                    <Text style={{ flex: 0.1 }}>:</Text>
                                    <Image style={{
                                        flex: 1,
                                        width: '100%',
                                        height: 100,
                                    }} source={{
                                        uri: i.suami_foto
                                    }} />
                                </View>
                                <MyList label="Nama" value={`${i.suami_nama}`} />
                                <MyList label="Tempat dan Tanggal Lahir" value={`${i.suami_tempat_lahir}, ${i.suami_tanggal_lahir}`} />
                                <MyList label="Telepon" value={`${i.suami_telepon}`} />
                                <MyList label="Pekerjaan" value={`${i.suami_pekerjaan}`} />
                                <MyList label="Alamat" value={`${i.suami_alamat}`} />
                                <MyList label="Nama Orang Tua" value={`${i.suami_orangtua}`} />
                            </View>
                            <View style={{
                                flex: 1,
                                padding: 2
                            }}>
                                {/* istri */}
                                <Text style={{
                                    backgroundColor: colors.primary,
                                    padding: 2,
                                    textAlign: 'center',
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 11,
                                    color: colors.white
                                }}>Calon Istri</Text>
                                <View style={{
                                    marginTop: 2,
                                    flexDirection: 'row',
                                    alignItems: 'flex-start'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 10,
                                        color: colors.black
                                    }}>Foto Latar Biru</Text>
                                    <Text style={{ flex: 0.1 }}>:</Text>
                                    <Image style={{
                                        flex: 1,
                                        width: '100%',
                                        height: 100,
                                        // resizeMode: 'contain'
                                    }} source={{
                                        uri: i.istri_foto
                                    }} />

                                </View>
                                <MyList label="Nama" value={`${i.istri_nama}`} />
                                <MyList label="Tempat dan Tanggal Lahir" value={`${i.istri_tempat_lahir}, ${i.istri_tanggal_lahir}`} />
                                <MyList label="Telepon" value={`${i.istri_telepon}`} />
                                <MyList label="Pekerjaan" value={`${i.istri_pekerjaan}`} />
                                <MyList label="Alamat" value={`${i.istri_alamat}`} />
                                <MyList label="Nama Orang Tua" value={`${i.istri_orangtua}`} />

                            </View>
                        </View>

                        <View>
                            <Text style={{

                                fontFamily: fonts.secondary[600],
                                fontSize: 8,
                                color: colors.coklat
                            }}>PERHATIAN :</Text>

                            <MyList2 label="1. " value="Setelah penentuan waktu akad nikah, Calon Pengantin agar segera mendaftar ke KUA Kecamatan Johan Pahlawan untuk mendapatkan penjelasan mengenai proses/tatacara dan persyaratan administrasi pencatatan pernikahan (abaikan bila telah dilakukan)." />
                            <MyList2 label="2. " value="Apabila ada perubahan waktu akad nikah, agar disampaikan sedini mungkin kepada Admin Fasilitasi Akad Nikah Masjid Agung." />
                        </View>

                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{

                                fontFamily: fonts.secondary[600],
                                fontSize: 8,
                                color: colors.coklat
                            }}>BAGI PENGANTIN DAN KELUARGA SERTA TAMU UNDANGAN :</Text>

                            <MyList2 label="1. " value="Wajib berbusana muslim/muslimah." />
                            <MyList2 label="2. " value="Dilarang merokok di dalam dan di lingkungan halaman masjid." />
                            <MyList2 label="3. " value="Tidak dibenarkan menggunakan pakaian slayer, mahkota dan bunga tangan (hand bucket)." />
                            <MyList2 label="4. " value="Diharapkan hadir 15 menit sebelum acara dimulai." />
                            <MyList2 label="5. " value="Mentaati adab (etika) yang berlaku dalam masjid." />
                            <MyList2 label="6. " value="Senantiasa menjaga kebersihan dari hal-hal yang dapat mengotori masjid." />
                            <MyList2 label="7. " value="Menghentikan segala aktifitas saat azan berkumandang dan bersiap melaksanakan shalat berjamaah" />

                        </View>
                        <View style={{
                            marginTop: 10,
                            // padding: 8,
                            backgroundColor: colors.pink,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: 8,
                                color: colors.blue
                            }}>Terima kasih atas kepercayaan Anda, semoga menjadi pasangan Sakinah, Mawaddah, Warahmah</Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: 8,
                                color: colors.blue
                            }}>{`>>> Admin 0852 6928 3629 <<<`}</Text>
                        </View>
                    </View>
                </ScrollView>
            </ViewShot >
            <View style={{
                backgroundColor: colors.white,
                padding: 10,
            }}>

                <MyButton title="Bagikan Resi Pembayaran" warna={colors.black} onPress={() => {
                    Share.open({
                        url: link,
                        title: 'Resi Pembayaran SiDani',
                        message: 'Resi Pembayaran SiDani',

                    }).then(s => {
                        console.log(s)
                    })
                }} />




            </View >
        </>
    )
}

const styles = StyleSheet.create({})