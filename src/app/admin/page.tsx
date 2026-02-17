'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface QuizResult {
  id: number;
  studentId: number;
  testType: string;
  grade: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
  student?: {
    id: number;
    name: string;
    email: string;
    grade: string;
  };
}

interface AdminData {
  stats: {
    totalStudents: number;
    totalQuizzes: number;
    averageScore: number;
  };
  students: {
    id: number;
    name: string;
    email: string;
    grade: string;
    createdAt: string;
    quizResults: QuizResult[];
  }[];
  recentSubmissions: QuizResult[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'results' | 'contact'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/quiz/results');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result.data);
    } catch (err) {
      setError('Failed to connect to server');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication
    const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='));
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setIsAuthenticated(true);
    fetchData();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-orange-300"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-6 min-w-max">
          {['overview', 'students', 'results', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard data...</p>
        </div>
      ) : data ? (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <span className="text-2xl">👨‍🎓</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Students</p>
                      <p className="text-3xl font-bold text-gray-900">{data.stats.totalStudents}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <span className="text-2xl">📝</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Total Quiz Results</p>
                      <p className="text-3xl font-bold text-gray-900">{data.stats.totalQuizzes}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-3xl font-bold text-gray-900">{Math.round(data.stats.averageScore)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Submissions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Quiz Submissions</h2>
                {data.recentSubmissions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Test Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Percentage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.recentSubmissions.map((result) => (
                          <tr key={result.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {result.student?.name || 'Unknown'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {result.student?.email || 'No email'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {result.testType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {result.grade}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {result.score}/{result.totalQuestions}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                result.percentage >= 80
                                  ? 'bg-green-100 text-green-800'
                                  : result.percentage >= 60
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                              >
                                {result.percentage}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(result.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No recent submissions</p>
                )}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">All Students</h2>
              <p className="text-sm text-gray-500 mb-4">Total: {data.students.length} students</p>
              {data.students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-sm text-gray-600 mt-1">Grade: {student.grade}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {student.quizResults.length} quiz{student.quizResults.length !== 1 ? 'zes' : ''} completed
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No students registered yet</p>
              )}
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">All Quiz Results</h2>
              {data.students.some((s) => s.quizResults.length > 0) ? (
                <div className="space-y-6">
                  {data.students
                    .filter((s) => s.quizResults.length > 0)
                    .map((student) => (
                      <div key={student.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {student.name} ({student.email})
                        </h3>
                        <div className="ml-4 space-y-2">
                          {student.quizResults.map((result) => (
                            <div
                              key={result.id}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded"
                            >
                              <div>
                                <span className="font-medium capitalize">{result.testType}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  {new Date(result.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded ${
                                  result.percentage >= 80
                                    ? 'bg-green-100 text-green-800'
                                    : result.percentage >= 60
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {result.percentage}% ({result.score}/{result.totalQuestions})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No quiz results yet</p>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Form Submissions</h2>
              <p className="text-gray-500 mb-4">Contact submissions will appear here when users submit the form.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
}
