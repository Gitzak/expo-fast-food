import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import { Home, Search, ShoppingBag, User } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

const TabBarIcon = ({ focused, Icon, title, onPress }: TabBarIconProps) => (
  <TouchableOpacity
    className="flex-1 items-center justify-center py-2"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Icon color={focused ? "#FE8C00" : "#5D5F6D"} size={24} />
    <Text
      className={cn(
        "text-sm font-bold",
        focused ? "text-primary" : "text-gray-200"
      )}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state }) => {
        const routes = [
          { name: "index", title: "Home", Icon: Home },
          { name: "search", title: "Search", Icon: Search },
          { name: "cart", title: "Cart", Icon: ShoppingBag },
          { name: "profile", title: "Profile", Icon: User },
        ];

        return (
          <View
            className="flex-row justify-between bg-white px-6 py-3 rounded-full mx-4 mb-5"
            style={{
              position: "absolute",
              bottom: 30,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {routes.map((route, index) => (
              <TabBarIcon
                key={route.name}
                focused={state.index === index}
                Icon={route.Icon}
                title={route.title}
                onPress={() => navigation.navigate(route.name)}
              />
            ))}
          </View>
        );
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
