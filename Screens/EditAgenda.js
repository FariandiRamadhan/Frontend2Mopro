import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { handleApiRequest } from '../Utilities/fetch_functions';
import { statusColors } from '../components/statusColors';

export default function EditAgenda({ route }) {
  const navigation = useNavigation();
  let data = "a";
  // const [getForm, setGetForm] = useState({});
  const [form, setForm] = useState({
    agenda_id         : '',
    judul             : '',
    meeting_time      : {tanggal: "", jam: ""},
    lokasi            : '',
    participants      : '',
    deskripsi_rapat   : '',
    status            : 'pending',
    kesimpulan_rapat  : '',
    follow_up_actions : ''
  });

  if(typeof route.params !== "undefined"){
    data = route.params.agenda_id;
    console.log(data);
  }
  
  useEffect(() => {
    handleApiRequest(`/agendas/${data}`)
    .then(response => {
        console.log(response);
        const data = response.data[0];

        setForm({
          agenda_id         : data.agenda_id,
          judul             : data.judul,
          meeting_time      : {tanggal: data.meeting_time.tanggal, jam: data.meeting_time.jam},
          lokasi            : data.lokasi,
          participants      : data.participants.toString(),
          deskripsi_rapat   : data.deskripsi_rapat,
          status            : data.status,
          kesimpulan_rapat  : data.kesimpulan_rapat,
          follow_up_actions : data.follow_up_actions
        });
        setTime(data.meeting_time.jam);
        setDate(data.meeting_time.tanggal);
    }).catch(error => console.error(error));
  }, [route]);

  const [errorForm, setErrorForm] = useState({
    agenda_id         : '',
    judul             : '',
    meeting_time      : '',
    lokasi            : '',
    participants      : '',
    deskripsi_rapat   : '',
    status            : 'pending',
    kesimpulan_rapat  : '',
    follow_up_actions : ''
  });
  const [errorAlert, setErrorAlert] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = ()=> {
    console.log(JSON.stringify(form));
    handleApiRequest('/agendas', {
      method  : 'POST',
      body    : JSON.stringify(form)
    }).then(response => {
      if(response.success){
        navigation.navigate('Home')
      }
    }).catch(error => {
      if(typeof error[2]?.errors === "undefined"){
        setErrorAlert("Silahkan coba lagi nanti");
      }else{
        setErrorForm({
          judul           : error[2].errors.reason?.judul,
          meeting_time    : error[2].errors.reason?.meeting_time,
          lokasi          : error[2].errors.reason?.lokasi,
          participants    : error[2].errors.reason?.participants,
          deskripsi_rapat : error[2].errors.reason?.deskripsi_rapat,
        })
      }
    });
  }

  // Menghandle perubahan input waktu
  const dateHandler = (rawDate) => {
    // Menghapus karakter non-numeric
    let cleanInput = rawDate.replace(/[^0-9]/g, '');
    let formattedDate = "";
              
    // Membatasi input dd/MM/YYYY
    cleanInput = cleanInput.slice(0, 8);

    // Jika panjang input lebih dari 4 maka akan muncul dua "/", contoh : "20/10/1"
    if (cleanInput.length >= 4) {
      formattedDate = `${cleanInput.slice(0, 2)}/${cleanInput.slice(2, 4)}/${cleanInput.slice(4, 8)}`;

    // Jika panjang input lebih dari 2 maka akan muncul satu "/", contoh : "20/1"
    } else if(cleanInput.length >= 2) {
      formattedDate = `${cleanInput.slice(0, 2)}/${cleanInput.slice(2, 4)}`;
    } else {
      formattedDate = cleanInput;
    }

    setDate(formattedDate)

    setForm({...form, meeting_time:{...form.meeting_time, tanggal: formattedDate}})
  }

  // Menghandle perubahan input waktu
  const timeHandler = (rawTime) => {
    let cleanInput = rawTime.replace(':', '');
    let formattedTime = "";

    // Menghapus input non-numeric
    cleanInput = cleanInput.replace(/[^0-9]/g, '');
    
    // Membatasi input sampai 4 digit saja
    cleanInput = cleanInput.slice(0, 4);
    
    // Menambahkan ":" jika input lebih dari 2 digit
    if (cleanInput.length >= 2) {
      formattedTime = cleanInput.slice(0, 2) + ':' + cleanInput.slice(2);
    } else {
      formattedTime = cleanInput;
    }

    setTime(formattedTime);
    setForm({...form, meeting_time:{...form.meeting_time, jam: formattedTime}});
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Agenda</Text>
        {errorAlert != ''? (
          <View style={[styles.error, statusColors.bgDanger]}>
            <Text style={[styles.errorMessage, statusColors.danger]}>{errorAlert}</Text>
          </View>  
        ) : null}

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="book-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Title</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter meeting title"
            placeholderTextColor="#666"
            value={form.judul}
            onChangeText={(title)=> setForm({...form, judul: title})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.judul}</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10, flexBasis: "40%" }]}>
            <View style={styles.labelContainer}>
              <Ionicons name="calendar-outline" size={20} color="#0066FF" />
              <Text style={styles.label}>Date</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="dd/mm/yyyy"
              placeholderTextColor="#666"
              value={date}
              onChangeText={dateHandler}
            />
          </View>

          <View style={[styles.formGroup, { flex: 1, marginLeft: 10, flexBasis: "40%" }]}>
            <View style={styles.labelContainer}>
              <Ionicons name="time-outline" size={20} color="#0066FF" />
              <Text style={styles.label}>Time</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="--:--"
              placeholderTextColor="#666"
              value={time}
              onChangeText={timeHandler}
            />
          </View>
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.meeting_time}</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="location-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Location</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter meeting location"
            placeholderTextColor="#666"
            value={form.lokasi}
            onChangeText={(location)=> setForm({...form, lokasi: location})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.lokasi}</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="people-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Participants</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter participant names (separated by comma)"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
            value={form.participants}
            onChangeText={(participants)=> setForm({...form, participants: participants})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.participants}</Text>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.labelContainer}>
            <Ionicons name="document-text-outline" size={20} color="#0066FF" />
            <Text style={styles.label}>Description</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter meeting description and agenda items"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
            value={form.deskripsi_rapat}
            onChangeText={(deskripsi)=> setForm({...form, deskripsi_rapat: deskripsi})}
          />
          <Text style={[styles.textError, statusColors.errorText]}>{errorForm.deskripsi_rapat}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Create Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 20 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  content: {
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  createButton: {
    flex: 1,
    backgroundColor: '#0066FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  textError: {
    fontSize: 16,
    paddingTop: 4,
    paddingStart: 8
  },
  error: {
    position: 'absolute',
    top: 30, 
    left: 20,
    right: 20,
    paddingBlock: 8,
    paddingInline: 6,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10
  },
  errorMessage: {
    fontSize: 18,
    textAlign: 'center'
  }
}); 