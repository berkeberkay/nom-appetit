import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Button,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Badge } from "@rneui/themed";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Navigation from "@components/Navigation";
import { ReviewInfo } from "@components/ReviewInfo";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FIREBASE_STORAGE } from "firebaseConfig";

type Review = {
  name: string;
  reviews: number;
  photos: number;
  rating: number;
  time: string;
  description: string;
  profilePicture: string;
};

const listReview: Review[] = [
  {
    name: "Bryan Tao",
    reviews: 10,
    photos: 5,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Rafael Park",
    reviews: 10,
    photos: 5,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4,
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
  {
    name: "Name",
    reviews: 10,
    photos: 5,
    rating: 4,
    profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
    time: "1w",
    description:
      "Delightful dinner! Friendly staff and unforgettable dessert. From the warm welcome at the door to the attentive service throughout our meal, every aspect of the evening contributed to a cozy, enjoyable atmosphere. The culinary creations were nothing short of exquisite, showcasing a brilliant blend of flavors and textures. This restaurant not only impressed with its menu but also with the genuine kindness and professionalism of its staff, making our dining experience exceptionally memorable. view less",
  },
];

type profile_info = {
  name: string;
  user_id: string;
  username: string;
  bio: string;
  saved: string[];
  reviews: string[];
};

export const Profile = () => {
  const { token } = useLocalSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState<profile_info>();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:5000/getUserInformation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(data);
        getDownloadURL(ref(FIREBASE_STORAGE, "users/" + data.user_id))
          .then((url) => setUrl(url))
          .catch((e) => setUrl(null));
        setLoaded(true);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["42.5%", "87.5%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef, loaded]);

  return (
    <>
      {loaded && (
        <SafeAreaView style={styles.containerBackground}>
          <View style={{ width: 334 }}>
            <Navigation
              leftIcon="arrow-left"
              rightIcon="home"
              leftNavigationOnPress={() => router.back()}
            />
          </View>

          <View style={styles.imageBackground}>
            {url ? (
              <>
                <Image source={{ uri: url }} style={styles.image} />
              </>
            ) : (
              <>
                <FontAwesome name="user" size={52} color="white" />
              </>
            )}
          </View>
          <Text style={styles.fullName}>{profile.name}</Text>
          <Text style={styles.userName}>{profile.username}</Text>
          <Text>{profile.bio}</Text>
          <View style={styles.infoBox}>
            <Pressable onPress={() => router.push("/saved_restaurants")}>
              <View style={styles.innerInfoBox}>
                <Text style={{ fontSize: 16 }}>Saved Restaurants</Text>
                <Text style={styles.profileStat}>{profile.saved.length}</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.buttonMenu}>
            <Pressable
              style={styles.editProfile}
              onPress={() => {
                router.push({
                  pathname: "edit_profile",
                  params: {
                    token: token,
                    id: profile.user_id,
                    oldName: profile.name,
                    oldUsername: profile.username,
                    oldBio: profile.bio,
                  },
                });
              }}
            >
              <FontAwesome5 name="pencil-alt" size={14} color="#004643" />
              <Text style={{ color: "#004643" }}>Edit Profile</Text>
            </Pressable>
          </View>
          <BottomSheetModalProvider>
            <View style={{ backgroundColor: "white" }}>
              <BottomSheetModal
                enablePanDownToClose={false}
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
              >
                <BottomSheetView style={styles.bottomSheetContainer}>
                  <Text style={styles.bottomSheetHeader}>
                    My Reviews ({profile.reviews.length})
                  </Text>
                  <View style={{ marginTop: 20 }}>
                    <FlatList
                      data={listReview}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "#6F846E8F",
                            borderRadius: 12,
                            marginBottom: 15,
                          }}
                        >
                          <ReviewInfo {...item} />
                        </View>
                      )}
                    />
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
        </SafeAreaView>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerBackground: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    maxWidth: "100%",
    minHeight: "100%",
    backgroundColor: "#E6EFD9",
  },

  imageBackground: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F846E8F",
    borderRadius: 125 / 2,
    width: 125,
    height: 125,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
  },
  userName: {
    fontSize: 16,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  innerInfoBox: {
    alignItems: "center",
  },
  profileStat: {
    fontSize: 20,
    fontWeight: "700",
  },
  buttonMenu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  editProfile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3CC91",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  notifcation: {
    backgroundColor: "#F3CC91",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bottomSheetContainer: {
    flexDirection: "column",
    padding: 20,
  },
  bottomSheetHeader: {
    fontFamily: "Lato", // Montserrat
    fontWeight: "600",
    fontSize: 20,
    color: "#004643",
  },
});
