<template>
  <div class="password-reset-container">
    <!-- Seção de Solicitação de Reset -->
    <div v-if="!showResetForm" class="request-section">
      <h2>Esqueceu sua senha?</h2>
      <p>Digite seu email para receber o link de redefinição</p>
      <input 
        v-model="email" 
        type="email" 
        placeholder="Seu email cadastrado" 
        
      />
      <button @click="handleSendResetEmail" :disabled="loading">
        {{ loading ? 'Enviando...' : 'Enviar Link' }}
      </button>
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>

    <!-- Seção de Redefinição de Senha -->
    <div v-else class="reset-section">
      <h2>Redefinir Senha</h2>
      <input 
        v-model="newPassword" 
        type="password" 
        placeholder="Nova senha (mínimo 6 caracteres)" 
      />
      <input 
        v-model="confirmPassword" 
        type="password" 
        placeholder="Confirme sua nova senha" 
      />
      <button @click="handleResetPassword" :disabled="loading">
        {{ loading ? 'Processando...' : 'Redefinir Senha' }}
      </button>
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  auth, 
  sendPasswordResetEmail, 
  confirmPasswordReset 
} from '@/utils/firebase';

export default {
  setup() {
    const route = useRoute();
    const email = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const message = ref('');
    const loading = ref(false);
    const showResetForm = ref(false);
    const actionCode = ref('');

    // Verifica se há um código de reset na URL
    onMounted(() => {
      actionCode.value = route.query.oobCode as string;
      showResetForm.value = !!actionCode.value;
    });

    const messageClass = computed(() => ({
      'error-message': message.value.includes('Erro') || message.value.includes('inválido'),
      'success-message': message.value.includes('sucesso')
    }));

    const handleSendResetEmail = async () => {
      if (!email.value) {
        message.value = 'Por favor, insira um email válido';
        return;
      }

      loading.value = true;
      try {
        await sendPasswordResetEmail(auth, email.value);
        message.value = 'Email enviado com sucesso! Verifique sua caixa de entrada.';
      } catch (error) {
        message.value = 'Erro ao enviar email. Verifique o endereço e tente novamente.';
      } finally {
        loading.value = false;
      }
    };

    const handleResetPassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        message.value = 'As senhas não coincidem!';
        return;
      }

      if (newPassword.value.length < 6) {
        message.value = 'A senha deve ter no mínimo 6 caracteres.';
        return;
      }

      loading.value = true;
      try {
        await confirmPasswordReset(auth, actionCode.value, newPassword.value);
        message.value = 'Senha redefinida com sucesso! Você pode fazer login agora.';
      } catch (error) {
        message.value = 'Erro ao redefinir senha. O link pode ter expirado.';
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      newPassword,
      confirmPassword,
      message,
      loading,
      showResetForm,
      messageClass,
      handleSendResetEmail,
      handleResetPassword
    };
  }
};
</script>

<style scoped>
.password-reset-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.request-section, .reset-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
}

.success-message {
  color: #00C851;
}
</style>