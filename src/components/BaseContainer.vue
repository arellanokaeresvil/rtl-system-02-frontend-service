<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" checked />
  <div class="drawer-content flex flex-col h-full">
    <!-- Navbar -->
    <nav class="navbar w-full h-1 border-b-2 border-gray-200">
      <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost ">
         <Menu  class="swap-off" size="20" />
      </label>

        <div class="flex grow justify-end px-2">
            <div class="flex-none">
              <ul  class="menu menu-horizontal px-1">
                <!-- <li><a>Link</a></li> -->
                <li>
                  <details>
                    <summary class="font-bold"> 
                      <!-- <div className="size-8 rounded-full bg-black text-white font-bold text-xs  flex items-center justify-center">
                       {{ getInitials(logged?.name) }}
                      </div> -->
                      {{ logged?.name }}</summary>
                    <ul class="bg-base-100 rounded-t-none p-2">
                      <li><a> <User size="20" /> Profile</a></li>
                      <li><a @click="auth.logout()"> <LogOut size="20" />Logout</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
        </div>
    </nav>
    
    <!-- Page content here -->
    <div class="flex-1 p-3 bg-gray-100 overflow-y-auto">
      <router-view />
    </div>

    <!-- <footer class="footer sm:footer-horizontal   bg-white footer-center border-t-2 border-gray-200 p-4 text-gray-500">
      <aside>
        <p>Copyright © 2026 - All right reserved by RTL Poultry Farm Management System</p>
      </aside>
    </footer> -->

  </div>

  <div class="drawer-side is-drawer-open:overflow-visible">
      <Sidebar /> 
  </div>


</div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores';
import Sidebar from './Sidebar.vue';

const auth = useAuthStore()
const { logged } = storeToRefs(auth)

if(auth.token){
  auth.fetchUser()
}


// const getInitials = (text: string) => {
//     return text
//     .split(' ')
//     .map(word => word.charAt(0))
//     .join('')
//     .toUpperCase()
// }



</script>


