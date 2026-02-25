import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import { 
    Camera,
    Boxes,
    Egg,
    Package,
    Syringe,
    DollarSign,
    HeartCrack,
    TrendingUp,
    BarChart3,
    Users,
    LayoutDashboard,
    User,
    LogOut,
    X,
    Menu,
    Plus,
    Trash2,
    SquarePen,
    CalendarDays,
    Calendar,
    BookPlus,
    ClipboardList

} from 'lucide-vue-next';


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.component("Camera", Camera)
app.component("Boxes", Boxes)
app.component("Egg", Egg)
app.component("Package", Package)
app.component("Syringe", Syringe)
app.component("DollarSign", DollarSign)
app.component("HeartCrack", HeartCrack)
app.component("TrendingUp", TrendingUp)
app.component("BarChart3", BarChart3)
app.component("Users", Users)
app.component("LayoutDashboard", LayoutDashboard)
app.component("User", User)
app.component("LogOut", LogOut)
app.component("X", X)
app.component("Menu", Menu)
app.component("Plus", Plus)
app.component("Trash2", Trash2)
app.component("SquarePen", SquarePen),
app.component("CalendarDays", CalendarDays),
app.component("Calendar", Calendar)
app.component("BookPlus", BookPlus)
app.component("ClipboardList", ClipboardList)

app.mount('#app')