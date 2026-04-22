<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(60,130,191,0.12),transparent_28%),linear-gradient(180deg,#f8fbfe_0%,#f3f8fc_60%,#eef5fb_100%)] text-slate-800">
    <header class="sticky top-0 z-50 border-b border-[rgba(219,231,241,0.86)] bg-white/82 backdrop-blur-[14px]">
      <div class="mx-auto flex min-h-[66px] w-[min(1120px,calc(100%-28px))] items-center justify-between gap-3 max-sm:w-[min(100%-16px,1120px)]">
        <div class="flex items-center gap-2.5 font-extrabold">
          <RouterLink
            to="/"
            class="grid h-10 w-[70px] place-items-center rounded-[14px] bg-gradient-to-br from-[rgb(60,130,191)] to-[rgb(31,77,117)] text-white shadow-[0_10px_20px_rgba(60,130,191,0.22)] max-sm:h-9 max-sm:w-9"
          >
            <span class="text-[11px] font-black tracking-[0.03em] max-sm:hidden">LUFTQI</span>
            <span class="hidden text-sm font-black max-sm:block">L</span>
          </RouterLink>
          <div>
            <strong class="block text-base leading-none max-sm:text-[15px]">補打卡申請</strong>
            <small class="text-[0.78rem] font-bold text-slate-500 max-sm:hidden">Repair Attendance</small>
          </div>
        </div>

        <RouterLink
          to="/"
          class="rounded-full bg-[rgba(60,130,191,0.1)] px-3 py-2 text-xs font-bold text-[rgb(31,77,117)]"
        >
          返回首頁
        </RouterLink>
      </div>
    </header>

    <main class="py-4 max-sm:py-3">
      <div class="mx-auto w-[min(1120px,calc(100%-28px))] max-sm:w-[min(100%-16px,1120px)]">
        <section class="rounded-[20px] border border-[rgba(219,231,241,0.96)] bg-white/92 p-4 shadow-[0_12px_24px_rgba(25,55,90,0.08)] max-sm:rounded-[18px] max-sm:p-3.5">
          <div class="mb-4">
            <h2 class="text-[1rem] font-bold">申請資料</h2>
            <p class="mt-1 text-sm text-slate-500">已預留主管與附件欄位，之後可接 GAS 與 LINE 通知。</p>
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">補打卡日期</label>
              <input
                v-model="form.date"
                type="date"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              />
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">補打卡類型</label>
              <select
                v-model="form.type"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              >
                <option value="">請選擇</option>
                <option value="上班補卡">上班補卡</option>
                <option value="下班補卡">下班補卡</option>
                <option value="外出補卡">外出補卡</option>
                <option value="返回公司補卡">返回公司補卡</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">補打卡時間</label>
              <input
                v-model="form.time"
                type="time"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              />
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">選擇主管</label>
              <select
                v-model="form.managerUserId"
                @change="syncManagerName"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              >
                <option value="">請選擇主管</option>
                <option
                  v-for="manager in managers"
                  :key="manager.userId"
                  :value="manager.userId"
                >
                  {{ manager.name }}
                </option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">原因說明</label>
              <textarea
                v-model="form.reason"
                rows="5"
                placeholder="請填寫補打卡原因"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">附件上傳（可選）</label>
              <input
                type="file"
                @change="handleFileChange"
                class="block w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-bold file:text-sky-700"
              />
              <p class="mt-2 text-xs text-slate-500">
                已選檔案：{{ form.attachmentName || '尚未選擇' }}
              </p>
            </div>
          </div>

          <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600">
            <div><strong>主管姓名：</strong>{{ form.managerName || '尚未選擇' }}</div>
            <div class="mt-1"><strong>主管 LINE User ID：</strong>{{ form.managerUserId || '尚未選擇' }}</div>
          </div>

          <div class="mt-4 flex gap-2">
            <button
              @click="submitForm"
              class="rounded-xl bg-[rgb(60,130,191)] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_16px_rgba(60,130,191,0.18)]"
            >
              送出申請
            </button>
            <button
              @click="resetForm"
              class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600"
            >
              清除
            </button>
          </div>

          <div v-if="message" class="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">
            {{ message }}
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

const managers = [
  { name: '王主任', userId: 'U_MANAGER_001' },
  { name: '李經理', userId: 'U_MANAGER_002' },
  { name: '陳主管', userId: 'U_MANAGER_003' }
]

const form = reactive({
  date: '',
  type: '',
  time: '',
  reason: '',
  managerName: '',
  managerUserId: '',
  attachmentFile: null,
  attachmentName: ''
})

const message = ref('')

function syncManagerName() {
  const manager = managers.find((item) => item.userId === form.managerUserId)
  form.managerName = manager ? manager.name : ''
}

function handleFileChange(event) {
  const file = event.target.files?.[0] || null
  form.attachmentFile = file
  form.attachmentName = file ? file.name : ''
}

function submitForm() {
  message.value = '補打卡骨架已升級，已預留主管與附件欄位，後續可接 GAS 與 LINE 通知。'
}

function resetForm() {
  form.date = ''
  form.type = ''
  form.time = ''
  form.reason = ''
  form.managerName = ''
  form.managerUserId = ''
  form.attachmentFile = null
  form.attachmentName = ''
  message.value = ''
}
</script>