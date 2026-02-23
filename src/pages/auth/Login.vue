<template>
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-bl from-green-50 to-green-95">
          <div class="w-105 max-w- md:max-w-lg lg:max-w-xl p-8 bg-white rounded-lg shadow-xl/30">


  
        <div class="text-center mb-8">
          <div class="flex items-center justify-center text-green-700 mb-2">
            <img class="w-40" src="../../../src/assets/logo2.png" alt="logo">
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mt-[-10px]">RTL Poultry Farm</h1>
          <p class="text-sm text-gray-500">Management System</p>
        </div>

        <div v-if="auth.is_error" role="alert" class="alert alert-error alert-soft mb-4">
            <span>{{ auth.error }}</span>
        </div>

       
        <form @submit.prevent="submit" class="space-y-4 justify-center">
          <div class="space-y-2">
            <label class="input validator w-full">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
                >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
            </svg>
            <input type="email" v-model="forms.email" placeholder="Email" required />
            </label>
            <div class="validator-hint hidden">Enter valid email address</div>
          </div>

          <div class="space-y-2">
            <label class="input validator w-full">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
                >
                <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
            </svg>
            <input
                type="password"
                required
                placeholder="Password"
                minlength="8"
                title="Must be more than 8 characters"
                v-model="forms.password"
            />
            </label>
            <p class="validator-hint hidden">
            Must be more than 8 characters
            </p>
          </div>

          
          <div class="flex items-center justify-between">

            <a href="#" class="text-sm text-black-600 hover:text-black-200 hover:underline">
              Forgot password?
            </a>
          </div>

          <button class="btn w-full h-11 bg-black text-white">
            <span v-if="auth.loading" class="loading"></span>
            <span v-else>Login</span> 
          </button>
        </form>


      
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <a href="#" class="text-black hover:underline font-medium">
              Contact Admin
            </a>
          </p>
        </div>

        <p class="text-center text-xs text-gray-400 mt-3">
          © 2026 RTL Poultry Farm Management System
        </p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '../../stores'

interface FormState {
    email: string,
    password: string
}

const forms = reactive<FormState>({
    email: "",
    password: ""
})

const auth = useAuthStore()

const submit = async () => {
  await auth.login(forms)

}
</script>
