import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";

import InputText from "primevue/inputtext";
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import Message from 'primevue/message';
import Tooltip from 'primevue/tooltip';
import ToggleButton from 'primevue/togglebutton';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';

const app = createApp(App);

app.use(ToastService);
app.use(PrimeVue);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Rating', Rating);
app.component('DataTable', Datatable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('ToggleButton', ToggleButton);
app.component('Password', Password);
app.component('Dropdown', Dropdown);
app.directive('tooltip', Tooltip);

app.mount("#app");

