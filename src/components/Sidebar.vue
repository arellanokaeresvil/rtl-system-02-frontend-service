<template>
<div class="flex h-screen flex-col border-r-2 border-gray-200 is-drawer-close:w-21 is-drawer-open:w-60">
             
        <div class="p-3 w-full flex flex-col items-center text-center shrink-0">
        <img class="w-30 -mt-2.5 is-drawer-close:w-90" src="../assets/logo2.png" alt="logo" />

        <h1 class="font-black text-l is-drawer-close:hidden ">
            Poultry Farm Management
        </h1>

        <p class="text-[10px] text-gray-500 mt-1 is-drawer-close:hidden ">
            Complete small-farm management system
        </p>
        </div>
    <div class="divider -mt-3 -mb-2 "></div>
        <!-- Sidebar content here -->
    <div class="overflow-y-auto">
      <ul class="menu w-full flex-1">
    
        <!-- List item -->
        <li v-for="item in menuItems" :key="item.route">
                <router-link :to="item.route" 
                :class="['is-drawer-close:tooltip is-drawer-close:tooltip-right m-3 rounded-xl p-2 pl-3 text-[15px]', activeModule === item.label ? 'bg-gray-900 text-white' : '', item.route != 'dashboard' ? ' -mt-0.75' : '']"
              
                >
                <component :is="item.icon" size="20" />
                <span class="is-drawer-close:hidden font-medium">{{ item.label }}</span>
            </router-link>
        </li>

      </ul>
    </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const activeModule = computed(() => {
  if (route.path.startsWith('/batches')) return 'Batches'
  if (route.path.startsWith('/dashboard')) return 'Dashboard'
  if (route.path.startsWith('/feeds')) return 'Feed & Inventory'
  if (route.path.startsWith('/sales')) return 'Sales & Income'
  if (route.path.startsWith('/egg-production')) return 'Egg Production'
  if (route.path.startsWith('/medication')) return 'Medication & Vaccines'
  if (route.path.startsWith('/mortality')) return 'Mortality & Culling'
  if (route.path.startsWith('/expenses')) return 'Expense Management'
  if (route.path.startsWith('/reports')) return 'Reports & Analytics'
  if (route.path.startsWith('/users')) return 'User Management'
  return ''
})


    const menuItems = ref([
    { route: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard'},
    { route: '/batches', label: 'Batches', icon: 'Boxes' },
    { route: '/egg-production', label: 'Egg Production', icon: 'Egg' },
    { route: '/feeds', label: 'Feed & Inventory', icon: 'Package' },
    { route: '/medication', label: 'Medication & Vaccines', icon: 'Syringe' },
    { route: '/mortality', label: 'Mortality & Culling', icon: 'HeartCrack' },
    { route: '/expenses', label: 'Expense Management', icon: 'DollarSign' },
    { route: '/sales', label: 'Sales & Income', icon: 'TrendingUp' },
    { route: '/reports', label: 'Reports & Analytics', icon: 'BarChart3' },
    { route: '/users', label: 'User Management', icon: 'Users' },
])



</script>