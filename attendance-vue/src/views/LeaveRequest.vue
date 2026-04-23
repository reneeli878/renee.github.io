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
            <strong class="block text-base leading-none max-sm:text-[15px]">請假申請</strong>
            <small class="text-[0.78rem] font-bold text-slate-500 max-sm:hidden">Leave Request</small>
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
            <h2 class="text-[1rem] font-bold">請假資料</h2>
            <p class="mt-1 text-sm text-slate-500">第一版先完成申請表單與申請紀錄，後續可再接 GAS 與主管審核。</p>
          </div>

          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">假別</label>
              <select
                v-model="form.leaveType"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              >
                <option value="">請選擇</option>
                <option value="特休">特休</option>
                <option value="補休">補休</option>
                <option value="病假">病假</option>
                <option value="事假">事假</option>
                <option value="無薪假">無薪假</option>
                <option value="婚假">婚假</option>
                <option value="喪假">喪假</option>
                <option value="產假">產假</option>
                <option value="陪產假">陪產假</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">請假單位</label>
              <select
                v-model="form.unit"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              >
                <option value="天">天</option>
                <option value="小時">小時</option>
              </select>
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">開始日期</label>
              <input
                v-model="form.startDate"
                type="date"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              />
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">結束日期</label>
              <input
                v-model="form.endDate"
                type="date"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              />
            </div>

            <div v-if="form.unit === '小時'">
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">開始時間</label>
              <input
                v-model="form.startTime"
                type="time"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              />
            </div>

            <div v-if="form.unit === '小時'">
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">結束時間</label>
              <input
                v-model="form.endTime"
                type="time"
                class="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[0.92rem] outline-none focus:border-sky-300"
              />
            </div>

            <div>
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">請假數量</label>
              <input
                v-model.number="form.amount"
                type="number"
                min="0"
                step="0.5"
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
              <label class="mb-1 block text-[0.78rem] font-bold text-slate-500">請假原因</label>
              <textarea
                v-model="form.reason"
                rows="5"
                placeholder="請填寫請假原因"
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
            <div class="mt-1">
              <strong>申請摘要：</strong>{{ leaveSummary }}
            </div>
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

        <section class="mt-3 rounded-[20px] border border-[rgba(219,231,241,0.96)] bg-white/92 p-4 shadow-[0_12px_24px_rgba(25,55,90,0.08)] max-sm:rounded-[18px] max-sm:p-3.5">
          <div class="mb-3 flex items-center justify-between gap-2.5">
            <h2 class="text-[1rem] font-bold">申請紀錄</h2>
            <small class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
              最近 {{ personalLeaveRecords.length }} 筆
            </small>
          </div>

          <div v-if="!personalLeaveRecords.length" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500">
            目前尚無請假申請紀錄。
          </div>

          <div v-else class="grid gap-2.5">
            <div
              v-for="record in personalLeaveRecords"
              :key="record.id"
              class="rounded-xl border border-slate-200 bg-[#fbfdff] px-3 py-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <strong class="text-[0.92rem] font-bold text-slate-800">
                      {{ record.leaveType }}
                    </strong>
                    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                      {{ record.amount }} {{ record.unit }}
                    </span>
                    <span class="text-[0.78rem] text-slate-400">
                      {{ record.applyDate }}
                    </span>
                  </div>

                  <div class="mt-1 text-[0.82rem] leading-[1.55] text-slate-500">
                    區間：{{ record.startDate }} ~ {{ record.endDate }}
                    <span v-if="record.unit === '小時'">
                      （{{ record.startTime || '--:--' }} ~ {{ record.endTime || '--:--' }}）
                    </span>
                  </div>

                  <div class="mt-1 text-[0.82rem] leading-[1.55] text-slate-500">
                    原因：{{ record.reason }}
                  </div>

                  <div class="mt-1 text-[0.78rem] leading-[1.5] text-slate-400">
                    主管：{{ record.managerName || '未指定' }}
                  </div>
                </div>

                <span
                  class="whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold"
                  :class="getStatusClass(record.status)"
                >
                  {{ record.status }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

const DEV_MODE = false
const LIFF_ID = '2008602232-c53WoD3q'

const currentUser = ref({
  userId: '',
  name: ''
})

const managers = [
  { name: '王主任', userId: 'U_MANAGER_001' },
  { name: '李經理', userId: 'U_MANAGER_002' },
  { name: '陳主管', userId: 'U_MANAGER_003' }
]

const form = reactive({
  leaveType: '',
  unit: '天',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  amount: 1,
  reason: '',
  managerName: '',
  managerUserId: '',
  attachmentFile: null,
  attachmentName: ''
})

const message = ref('')

const leaveRecords = ref([
  {
    id: 1,
    userId: 'U_TEST_001',
    applyDate: '2026/04/23 09:10',
    leaveType: '特休',
    unit: '天',
    startDate: '2026-04-25',
    endDate: '2026-04-25',
    startTime: '',
    endTime: '',
    amount: 1,
    reason: '家中有事，需請假一天。',
    managerName: '王主任',
    status: '待審核'
  },
  {
    id: 2,
    userId: 'U_TEST_002',
    applyDate: '2026/04/18 14:25',
    leaveType: '病假',
    unit: '小時',
    startDate: '2026-04-18',
    endDate: '2026-04-18',
    startTime: '14:00',
    endTime: '17:00',
    amount: 3,
    reason: '身體不適，下午就醫休息。',
    managerName: '李經理',
    status: '已核准'
  }
])

const personalLeaveRecords = computed(() => {
  if (!currentUser.value.userId) return []
  return leaveRecords.value.filter(
    record => record.userId === currentUser.value.userId
  )
})

const leaveSummary = computed(() => {
  if (!form.leaveType) return '尚未填寫完整請假資料'

  const dateRange = form.startDate && form.endDate
    ? `${form.startDate} ~ ${form.endDate}`
    : '日期未完整'

  const timeRange = form.unit === '小時'
    ? ` ${form.startTime || '--:--'} ~ ${form.endTime || '--:--'}`
    : ''

  return `${form.leaveType}｜${dateRange}${timeRange}｜${form.amount || 0}${form.unit}`
})

function syncManagerName() {
  const manager = managers.find((item) => item.userId === form.managerUserId)
  form.managerName = manager ? manager.name : ''
}

function handleFileChange(event) {
  const file = event.target.files?.[0] || null
  form.attachmentFile = file
  form.attachmentName = file ? file.name : ''
}

function getStatusClass(status) {
  if (status === '已核准') return 'bg-green-100 text-green-700'
  if (status === '已退回') return 'bg-red-100 text-red-700'
  return 'bg-amber-100 text-amber-700'
}

function submitForm() {
  if (!form.leaveType || !form.startDate || !form.endDate || !form.reason || !form.amount) {
    message.value = '請先填寫完整的請假資料。'
    return
  }

  if (form.unit === '小時' && (!form.startTime || !form.endTime)) {
    message.value = '請先填寫完整的請假時間。'
    return
  }

  leaveRecords.value.unshift({
  id: Date.now(),
  userId: currentUser.value.userId,
  applyDate: new Date().toLocaleString('zh-TW', { hour12: false }),
  leaveType: form.leaveType,
  unit: form.unit,
  startDate: form.startDate,
  endDate: form.endDate,
  startTime: form.startTime,
  endTime: form.endTime,
  amount: form.amount,
  reason: form.reason,
  managerName: form.managerName,
  status: '待審核'
})

  message.value = '請假申請已加入申請紀錄。'
  resetForm()
}

function resetForm() {
  form.leaveType = ''
  form.unit = '天'
  form.startDate = ''
  form.endDate = ''
  form.startTime = ''
  form.endTime = ''
  form.amount = 1
  form.reason = ''
  form.managerName = ''
  form.managerUserId = ''
  form.attachmentFile = null
  form.attachmentName = ''
}

async function initLiff() {
  try {
    if (DEV_MODE) {
      currentUser.value = {
        userId: 'U_TEST_001',
        name: '測試使用者'
      }
      return
    }

    if (!window.liff) throw new Error('LIFF SDK 未載入')

    await window.liff.init({ liffId: LIFF_ID })

    if (!window.liff.isLoggedIn()) {
      window.liff.login()
      return
    }

    const profile = await window.liff.getProfile()
    currentUser.value = {
      userId: profile.userId,
      name: profile.displayName || ''
    }
  } catch (error) {
    console.error('LIFF 初始化失敗:', error)
  }
}

onMounted(async () => {
  await initLiff()
})
</script>