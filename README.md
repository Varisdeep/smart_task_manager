# 🚀 Smart Task Manager

A modern, feature-rich task management application built with React Hooks, demonstrating advanced React patterns and beautiful UI design. This project showcases comprehensive usage of all major React hooks in practical, real-world scenarios.

![Smart Task Manager](https://img.shields.io/badge/React-18.0+-blue.svg)

## ✨ Features

### 🎯 **Core Functionality**
- ✅ **Task Management**: Add, edit, delete, and toggle task completion
- 🔍 **Smart Filtering**: Filter by status (all/completed/pending) and sort by date/priority
- 📊 **Real-time Analytics**: Live completion rates and progress tracking
- ⏰ **Pomodoro Timer**: Built-in focus timer with work/break sessions
- 🎨 **Beautiful UI**: Modern gradient design with glass morphism effects
- 💾 **Data Persistence**: All data saved to localStorage automatically
- 📱 **Responsive Design**: Works perfectly on all screen sizes

### 🎛️ **Advanced Features**
- 🎵 **Sound Notifications**: Audio feedback for timer completion
- ⚙️ **Customizable Settings**: Adjustable timer durations and preferences
- 🏷️ **Priority System**: Color-coded task priorities (Low/Medium/High)
- 📈 **Progress Visualization**: Interactive progress bars and statistics
- 🎯 **Auto-focus**: Smart input focusing for better UX
- 🔄 **Real-time Updates**: Instant UI updates across all components

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Hooks (useState, useReducer, useContext)
- **Performance**: useMemo, useCallback for optimization
- **Storage**: localStorage with custom hooks
- **Icons**: Lucide React

## 🎣 React Hooks Implementation

This project demonstrates comprehensive usage of React Hooks as per academic requirements:

### **useState** (2 use cases)
1. **Task List Filtering** - Managing filter and sort states in TaskList component
2. **Task Completion Toggle** - Handling task completion status changes

### **useEffect** (2 use cases)
1. **localStorage Sync** - Automatically saving data to localStorage in useLocalStorage hook
2. **Data Loading** - Loading saved tasks on mount and listening for storage changes

### **useReducer** (2 use cases)
1. **Task Input Form** - Managing complex form state in TaskInput component
2. **Timer State Management** - Handling timer logic and state transitions in Timer component

### **useRef** (2 use cases)
1. **Input Focus Management** - Auto-focusing input fields after task creation
2. **Timer Interval Tracking** - Managing timer intervals in usePomodoroTimer hook

### **useContext** (2 use cases)
1. **Settings Context** - Global app settings (auto-focus, sound, timer durations)
2. **Task Stats Context** - Sharing task data and statistics across components

### **useMemo** (2 use cases)
1. **Filtered Tasks** - Optimizing task filtering and sorting operations
2. **Completion Statistics** - Memoizing expensive statistical calculations

### **useCallback** (2 use cases)
1. **Task Operations** - Optimizing add/remove task functions
2. **Timer Controls** - Memoizing timer control functions

### **useLayoutEffect** (2 use cases)
1. **Scroll Management** - Auto-scrolling to newly added tasks
2. **Layout Adjustments** - Dynamic container height adjustments

### **Custom Hooks** (2 implementations)
1. **useLocalStorage** - Persistent state management with localStorage integration
2. **usePomodoroTimer** - Complete timer functionality with start/pause/reset capabilities

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main application component
│   └── globals.css              # Global styles
├── components/
│   ├── TaskInput.tsx            # Task creation form
│   ├── TaskList.tsx             # Task display and management
│   ├── TaskStats.tsx            # Statistics dashboard
│   └── Timer.tsx                # Pomodoro timer component
├── context/
│   ├── SettingsContext.tsx      # App settings context
│   └── TaskStatsContext.tsx     # Task data context
├── hooks/
│   ├── useLocalStorage.ts       # localStorage custom hook
│   └── usePomodoroTimer.ts      # Timer custom hook
└── components/ui/               # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── progress.tsx
    └── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-task-manager.git
   cd smart-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🎯 Usage Guide

### **Creating Tasks**
1. Enter your task in the input field
2. Select priority level (Low/Medium/High)
3. Click "Add Task" or press Enter
4. Task appears in the list with color-coded priority

### **Managing Tasks**
- **Complete**: Click the checkbox to mark as done
- **Delete**: Hover over task and click the trash icon
- **Filter**: Use dropdown to show all/completed/pending tasks
- **Sort**: Sort by date created or priority level

### **Using the Timer**
1. Choose "Focus" for work sessions or "Break" for rest
2. Click "Start Session" to begin
3. Use pause/reset controls as needed
4. Timer automatically tracks progress with visual indicators

### **Viewing Statistics**
- Real-time completion rate percentage
- Total, completed, and pending task counts
- Motivational messages based on progress
- Visual progress indicators

## 🎨 Design Features

### **Visual Elements**
- **Gradient Backgrounds**: Beautiful color transitions throughout the app
- **Glass Morphism**: Translucent elements with backdrop blur effects
- **Smooth Animations**: Hover effects and transitions for better UX
- **Color-coded Priorities**: Visual distinction for task importance levels
- **Responsive Layout**: Adapts to all screen sizes seamlessly

### **Interactive Components**
- **Hover Effects**: Cards and buttons respond to user interaction
- **Progress Bars**: Animated progress indicators with gradient overlays
- **Dynamic Badges**: Real-time updating status indicators
- **Smooth Transitions**: All state changes include smooth animations

## 📊 Performance Optimizations

- **Memoization**: Strategic use of useMemo and useCallback
- **Efficient Filtering**: Optimized task filtering and sorting
- **Minimal Re-renders**: Context optimization to prevent unnecessary updates
- **Local Storage**: Efficient data persistence without external dependencies

## 🔧 Configuration

### **Timer Settings**
- Default work session: 25 minutes
- Default break session: 5 minutes
- Sound notifications: Enabled by default
- Auto-focus: Enabled by default

### **Customization**
All settings are stored in localStorage and persist across sessions. Users can modify:
- Timer durations
- Sound preferences
- Auto-focus behavior

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Academic Context

This project was developed as part of the CSDD2002 - Emerging Dev Technologies course at Loyalist College, demonstrating mastery of React Hooks in a practical application context.

**Instructor**: Aditya Saxena  
**Course**: CSDD2002 - Emerging Dev Technologies  
**Institution**: Loyalist College

## 🙏 Acknowledgments

- **React Team** for the amazing hooks API
- **Vercel** for Next.js framework
- **shadcn/ui** for beautiful component library
- **Tailwind CSS** for utility-first styling
- **Lucide** for the icon library

## 📞 Support

If you have any questions or need help with the project:

- 📧 Email: aditya.saxena@tbcollege.com
- 📧 Email: aditya.saxena@torontomu.ca
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/smart-task-manager/issues)

---

**Built with ❤️ using React Hooks and modern web technologies**
